document.addEventListener("DOMContentLoaded", function () {
  const selectors = [
    "#main-content h2",
    "#main-content h3",
    "#main-content .hero__card",
    "#main-content .category-card",
    "#main-content .product-card",
    "#main-content .service",
    "#main-content .customer-review__slide",
    "#main-content .insta-grid__item",
    "#main-content .banner-content",
  ].join(", ");

  const elements = Array.prototype.filter.call(
    document.querySelectorAll(selectors),
    function (el) {
      if (el.matches("h3") && el.closest(".banner-content")) {
        return false;
      }

      return true;
    },
  );

  if (!elements.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    elements.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    },
  );

  elements.forEach(function (el) {
    el.classList.add("heading-reveal");
    observer.observe(el);
  });

  /** Flush any intersections already true before the first paint (avoids sticky threshold edge cases). */
  requestAnimationFrame(function () {
    observer.takeRecords().forEach(function (entry) {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  });
});
