// const categorySlider = document.querySelector("[data-category-slider]");
// const categoryDots = document.querySelector("[data-category-dots]");
// const categoryPrefersReducedMotion = window.matchMedia(
//   "(prefers-reduced-motion: reduce)",
// );

// if (categorySlider && categoryDots) {
//   const categoryCards = Array.from(
//     categorySlider.querySelectorAll(".category-card"),
//   );

//   categoryCards.forEach((card, index) => {
//     const dot = document.createElement("button");

//     dot.type = "button";
//     dot.className = "category-dot";
//     dot.setAttribute("aria-label", `Show category ${index + 1}`);

//     if (index === 0) {
//       dot.classList.add("is-active");
//       dot.setAttribute("aria-current", "true");
//     }

//     dot.addEventListener("click", () => {
//       card.scrollIntoView({
//         behavior: categoryPrefersReducedMotion.matches ? "auto" : "smooth",
//         block: "nearest",
//         inline: "center",
//       });
//     });

//     categoryDots.appendChild(dot);
//   });

//   const dots = Array.from(categoryDots.querySelectorAll(".category-dot"));
//   let animationFrame;

//   const updateActiveDot = () => {
//     const sliderCenter =
//       categorySlider.scrollLeft + categorySlider.offsetWidth / 2;
//     let activeIndex = 0;
//     let closestDistance = Infinity;

//     categoryCards.forEach((card, index) => {
//       const cardCenter = card.offsetLeft + card.offsetWidth / 2;
//       const distance = Math.abs(sliderCenter - cardCenter);

//       if (distance < closestDistance) {
//         closestDistance = distance;
//         activeIndex = index;
//       }
//     });

//     dots.forEach((dot, index) => {
//       const isActive = index === activeIndex;

//       dot.classList.toggle("is-active", isActive);

//       if (isActive) {
//         dot.setAttribute("aria-current", "true");
//       } else {
//         dot.removeAttribute("aria-current");
//       }
//     });
//   };

//   categorySlider.addEventListener(
//     "scroll",
//     () => {
//       window.cancelAnimationFrame(animationFrame);
//       animationFrame = window.requestAnimationFrame(updateActiveDot);
//     },
//     { passive: true },
//   );

//   window.addEventListener("resize", updateActiveDot);
// }

const categorySlider = document.querySelector("[data-category-slider]");
const categoryDots = document.querySelector("[data-category-dots]");

const categoryPrefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

if (categorySlider && categoryDots) {
  const categoryCards = Array.from(
    categorySlider.querySelectorAll(".category-card"),
  );

  // Create dots
  categoryCards.forEach((card, index) => {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.className = "category-dot";
    dot.setAttribute("aria-label", `Show category ${index + 1}`);

    if (index === 0) {
      dot.classList.add("is-active");
      dot.setAttribute("aria-current", "true");
    }

    dot.addEventListener("click", () => {
      card.scrollIntoView({
        behavior: categoryPrefersReducedMotion.matches ? "auto" : "smooth",
        block: "nearest",
        inline: "center",
      });
    });

    categoryDots.appendChild(dot);
  });

  const dots = Array.from(categoryDots.querySelectorAll(".category-dot"));

  let animationFrame;
  let cardCenters = [];

  // Cache layout measurements
  const calculateCardCenters = () => {
    cardCenters = categoryCards.map((card) => {
      return card.offsetLeft + card.offsetWidth / 2;
    });
  };

  calculateCardCenters();

  const updateActiveDot = () => {
    const sliderCenter =
      categorySlider.scrollLeft + categorySlider.clientWidth / 2;

    let activeIndex = 0;
    let closestDistance = Infinity;

    cardCenters.forEach((center, index) => {
      const distance = Math.abs(sliderCenter - center);

      if (distance < closestDistance) {
        closestDistance = distance;
        activeIndex = index;
      }
    });

    dots.forEach((dot, index) => {
      const isActive = index === activeIndex;

      dot.classList.toggle("is-active", isActive);

      if (isActive) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  };

  categorySlider.addEventListener(
    "scroll",
    () => {
      cancelAnimationFrame(animationFrame);

      animationFrame = requestAnimationFrame(updateActiveDot);
    },
    { passive: true },
  );

  window.addEventListener("resize", () => {
    calculateCardCenters();
    updateActiveDot();
  });

  updateActiveDot();
}
