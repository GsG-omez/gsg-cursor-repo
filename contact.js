import { CONTACT_CONFIG } from "./contact-config.js";
import {
  checkHoneypots,
  checkRateLimit,
  checkTiming,
  markSubmitted,
  normalizeEmail,
  validateEmailFormat,
  validateMessage,
  verifyDomainHasMx,
} from "./contact-security.js";

const pageOpenedAt = Date.now();
const form = document.getElementById("contact-form");
const nextInput = document.getElementById("form-next");
const successBanner = document.getElementById("contact-success");
const errorBanner = document.getElementById("contact-error");
const submitBtn = document.getElementById("contact-submit");
const emailInput = document.getElementById("contact-email");
const messageInput = document.getElementById("contact-message");
const turnstileMount = document.getElementById("turnstile-mount");
const configWarning = document.getElementById("contact-config-warning");

let turnstileToken = "";
let turnstileWidgetId = null;

function showError(message) {
  if (!errorBanner) return;
  errorBanner.textContent = message;
  errorBanner.hidden = false;
  successBanner.hidden = true;
}

function clearError() {
  if (errorBanner) {
    errorBanner.hidden = true;
    errorBanner.textContent = "";
  }
}

function isConfigured() {
  return (
    CONTACT_CONFIG.formsubmitEmail &&
    !CONTACT_CONFIG.formsubmitEmail.startsWith("REPLACE_WITH") &&
    CONTACT_CONFIG.turnstileSiteKey &&
    !CONTACT_CONFIG.turnstileSiteKey.startsWith("REPLACE_WITH")
  );
}

function setSubmitting(isSubmitting) {
  if (submitBtn) {
    submitBtn.disabled = isSubmitting;
    submitBtn.textContent = isSubmitting ? "Verifying…" : "Send message";
  }
}

window.onTurnstileSuccess = (token) => {
  turnstileToken = token;
  clearError();
};

window.onTurnstileExpired = () => {
  turnstileToken = "";
};

if (nextInput) {
  const returnUrl = new URL("contact.html", window.location.href);
  returnUrl.searchParams.set("sent", "1");
  nextInput.value = returnUrl.href;
}

if (new URLSearchParams(window.location.search).get("sent") === "1") {
  successBanner.hidden = false;
  form.hidden = true;
  if (configWarning) configWarning.hidden = true;
}

function loadTurnstile() {
  if (!isConfigured() || !turnstileMount) return;

  const render = () => {
    if (!window.turnstile || turnstileWidgetId !== null) return;
    turnstileWidgetId = window.turnstile.render(turnstileMount, {
      sitekey: CONTACT_CONFIG.turnstileSiteKey,
      theme: "dark",
      callback: "onTurnstileSuccess",
      "expired-callback": "onTurnstileExpired",
    });
  };

  if (window.turnstile) {
    render();
  } else {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = render;
    document.head.appendChild(script);
  }
}

if (!isConfigured()) {
  if (configWarning) configWarning.hidden = false;
  if (submitBtn) submitBtn.disabled = true;
} else {
  loadTurnstile();
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearError();

  if (!isConfigured()) {
    showError("Contact form isn't configured yet. Add your email and Turnstile keys in contact-config.js.");
    return;
  }

  if (!turnstileToken) {
    showError("Complete the security check before sending.");
    return;
  }

  const honey = checkHoneypots(form);
  if (!honey.ok) {
    showError(honey.reason);
    return;
  }

  const timing = checkTiming(pageOpenedAt, CONTACT_CONFIG);
  if (!timing.ok) {
    showError(timing.reason);
    return;
  }

  const rate = checkRateLimit(CONTACT_CONFIG);
  if (!rate.ok) {
    showError(rate.reason);
    return;
  }

  const email = normalizeEmail(emailInput.value);
  const format = validateEmailFormat(email);
  if (!format.ok) {
    showError(format.reason);
    emailInput.focus();
    return;
  }

  const messageCheck = validateMessage(messageInput.value, CONTACT_CONFIG);
  if (!messageCheck.ok) {
    showError(messageCheck.reason);
    messageInput.focus();
    return;
  }

  setSubmitting(true);

  const mx = await verifyDomainHasMx(format.domain);
  if (!mx.ok) {
    showError(mx.reason);
    setSubmitting(false);
    emailInput.focus();
    return;
  }

  const payload = new FormData(form);
  payload.set("email", email);
  payload.set("cf-turnstile-response", turnstileToken);
  payload.set("_captcha", "true");

  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_CONFIG.formsubmitEmail)}`,
      {
        method: "POST",
        body: payload,
        headers: { Accept: "application/json" },
      }
    );

    const result = await response.json().catch(() => ({}));

    if (!response.ok || result.success === false) {
      throw new Error(result.message || "Submission failed. Try again later.");
    }

    markSubmitted();
    const returnUrl = new URL("contact.html", window.location.href);
    returnUrl.searchParams.set("sent", "1");
    window.location.href = returnUrl.href;
  } catch (error) {
    showError(error.message || "Something went wrong. Please try again.");
    if (window.turnstile && turnstileWidgetId !== null) {
      window.turnstile.reset(turnstileWidgetId);
      turnstileToken = "";
    }
  } finally {
    setSubmitting(false);
  }
});
