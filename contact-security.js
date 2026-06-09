const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "sharklasers.com",
  "grr.la",
  "guerrillamailblock.com",
  "pokemail.net",
  "spam4.me",
  "tempmail.com",
  "temp-mail.org",
  "throwaway.email",
  "getnada.com",
  "yopmail.com",
  "10minutemail.com",
  "trashmail.com",
  "dispostable.com",
  "maildrop.cc",
  "fakeinbox.com",
  "mintemail.com",
  "mailnesia.com",
  "tempail.com",
  "emailondeck.com",
  "burnermail.io",
  "inboxkitten.com",
  "mohmal.com",
  "tmpmail.net",
  "tmpmail.org",
  "dropmail.me",
  "harakirimail.com",
  "mailcatch.com",
  "mytemp.email",
  "tempr.email",
  "mailpoof.com",
  "spamgourmet.com",
  "mail.tm",
  "ethereal.email",
  "mailinator.net",
  "mailinator2.com",
]);

const ROLE_LOCAL_PARTS = new Set([
  "admin",
  "noreply",
  "no-reply",
  "donotreply",
  "do-not-reply",
  "postmaster",
  "abuse",
  "spam",
  "mailer-daemon",
  "root",
  "test",
  "null",
  "nobody",
]);

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

export function validateEmailFormat(email) {
  if (!email || email.length > 254) {
    return { ok: false, reason: "Enter a valid email address." };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { ok: false, reason: "That email format doesn't look valid." };
  }
  const [local, domain] = email.split("@");
  if (!local || !domain || local.length > 64) {
    return { ok: false, reason: "Enter a valid email address." };
  }
  if (local.includes("..") || domain.includes("..")) {
    return { ok: false, reason: "Enter a valid email address." };
  }
  if (ROLE_LOCAL_PARTS.has(local)) {
    return { ok: false, reason: "Use a personal or work inbox, not a system address." };
  }
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return { ok: false, reason: "Disposable email addresses aren't accepted." };
  }
  const tld = domain.split(".").pop();
  if (!tld || tld.length < 2) {
    return { ok: false, reason: "Enter a valid email domain." };
  }
  return { ok: true, domain };
}

export async function verifyDomainHasMx(domain) {
  try {
    const response = await fetch(
      `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=MX`,
      { headers: { Accept: "application/dns-json" } }
    );
    if (!response.ok) {
      return { ok: false, reason: "Couldn't verify that domain. Try again in a moment." };
    }
    const data = await response.json();
    const answers = data.Answer ?? [];
    const hasMx = answers.some((record) => record.type === 15);
    if (!hasMx) {
      return { ok: false, reason: "That domain can't receive email. Check for typos." };
    }
    return { ok: true };
  } catch {
    return { ok: false, reason: "Couldn't verify that domain. Check your connection and retry." };
  }
}

export function validateMessage(message, config) {
  const trimmed = message.trim();
  if (trimmed.length < config.minMessageLength) {
    return {
      ok: false,
      reason: `Message must be at least ${config.minMessageLength} characters.`,
    };
  }
  if (trimmed.length > config.maxMessageLength) {
    return { ok: false, reason: "Message is too long." };
  }
  const urlCount = (trimmed.match(/https?:\/\/|www\./gi) ?? []).length;
  if (urlCount > 2) {
    return { ok: false, reason: "Too many links in the message." };
  }
  if (/(.)\1{7,}/.test(trimmed)) {
    return { ok: false, reason: "Message looks automated. Please write naturally." };
  }
  return { ok: true };
}

export function checkHoneypots(form) {
  const traps = form.querySelectorAll("[data-honeypot]");
  for (const trap of traps) {
    if (trap.value && trap.value.trim()) {
      return { ok: false, reason: "Submission blocked." };
    }
  }
  return { ok: true };
}

export function checkTiming(pageOpenedAt, config) {
  const elapsed = (Date.now() - pageOpenedAt) / 1000;
  if (elapsed < config.minSecondsOnPage) {
    return { ok: false, reason: "Please take a moment before sending." };
  }
  return { ok: true };
}

export function checkRateLimit(config) {
  const key = "contact:lastSubmit";
  const last = Number(sessionStorage.getItem(key) || 0);
  const cooldownMs = config.rateLimitMinutes * 60 * 1000;
  if (last && Date.now() - last < cooldownMs) {
    const mins = Math.ceil((cooldownMs - (Date.now() - last)) / 60000);
    return { ok: false, reason: `Please wait ${mins} minute(s) before sending again.` };
  }
  return { ok: true };
}

export function markSubmitted() {
  sessionStorage.setItem("contact:lastSubmit", String(Date.now()));
}
