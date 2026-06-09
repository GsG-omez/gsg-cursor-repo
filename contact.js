const form = document.getElementById("contact-form");
const nextInput = document.getElementById("form-next");
const successBanner = document.getElementById("contact-success");

if (nextInput) {
  const returnUrl = new URL("contact.html", window.location.href);
  returnUrl.searchParams.set("sent", "1");
  nextInput.value = returnUrl.href;
}

if (new URLSearchParams(window.location.search).get("sent") === "1") {
  if (successBanner) {
    successBanner.hidden = false;
  }
  if (form) {
    form.hidden = true;
  }
}
