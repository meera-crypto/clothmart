document.addEventListener("DOMContentLoaded", function () {
  var section = document.getElementById("best-selling-products");
  if (!section) {
    return;
  }

  var bestSellers = section.querySelector(".best-sellers");
  var sourceGrid = section.querySelector(".best-sellers__grid");
  var loadMoreWrap = section.querySelector(".load-more");
  var loadMoreBtn = loadMoreWrap && loadMoreWrap.querySelector("button[type='button']");

  if (!bestSellers || !sourceGrid || !loadMoreWrap || !loadMoreBtn) {
    return;
  }

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  loadMoreBtn.addEventListener("click", function () {
    var clone = sourceGrid.cloneNode(true);
    clone.querySelectorAll(".product-card").forEach(function (card) {
      card.classList.add("heading-reveal", "is-visible");
    });
    bestSellers.insertBefore(clone, loadMoreWrap);

    if (!section.querySelector("[data-best-sellers-back-top]")) {
      var backWrap = document.createElement("div");
      backWrap.className = "best-sellers__back-top";
      backWrap.setAttribute("data-best-sellers-back-top", "");

      var backBtn = document.createElement("button");
      backBtn.type = "button";
      backBtn.className = "btn btn-primary";
      backBtn.textContent = "Back to top";

      backBtn.addEventListener("click", function () {
        section.scrollIntoView({
          behavior: prefersReducedMotion.matches ? "auto" : "smooth",
          block: "start",
        });
      });

      backWrap.appendChild(backBtn);
      loadMoreWrap.insertBefore(backWrap, loadMoreBtn);
    }
  });
});
