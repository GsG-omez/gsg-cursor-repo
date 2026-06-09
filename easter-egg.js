const pages = document.querySelectorAll("[data-neb-page]");
const navLinks = document.querySelectorAll("[data-neb-nav]");

function showPage(pageId) {
  pages.forEach((page) => {
    page.classList.toggle("is-active", page.dataset.nebPage === pageId);
  });

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.nebNav === pageId);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = link.dataset.nebNav;
    if (!target || link.getAttribute("href")?.startsWith("http")) return;
    event.preventDefault();
    showPage(target);
  });
});

document.querySelectorAll("[data-neb-jump]").forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    showPage(btn.dataset.nebJump);
  });
});
