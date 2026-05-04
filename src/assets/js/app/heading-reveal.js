document.addEventListener("DOMContentLoaded", function () {
  const headings = document.querySelectorAll(
    "#main-content h2, #main-content h3",
  );

  if (!headings.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    headings.forEach(function (heading) {
      heading.classList.add("is-visible");
    });
    return;
  }

  const headingObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
    },
  );

  headings.forEach(function (heading) {
    heading.classList.add("heading-reveal");
    headingObserver.observe(heading);
  });
});
