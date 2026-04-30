const reviewTrack = document.querySelector("[data-review-track]");
const reviewDots = document.querySelector("[data-review-dots]");

if (reviewTrack && reviewDots) {
  const reviewSlides = Array.from(
    reviewTrack.querySelectorAll(".customer-review__slide"),
  );
  let reviewDotButtons = Array.from(
    reviewDots.querySelectorAll(".customer-review__dot"),
  );
  let activeReviewIndex = 0;
  let reviewAnimationFrame;

  if (!reviewDotButtons.length) {
    reviewSlides.forEach((slide, index) => {
      const dot = document.createElement("button");

      dot.type = "button";
      dot.className = "customer-review__dot";
      dot.setAttribute("aria-label", `Show customer review ${index + 1}`);

      if (index === 0) {
        dot.classList.add("is-active");
        dot.setAttribute("aria-current", "true");
      }

      reviewDots.appendChild(dot);
    });

    reviewDotButtons = Array.from(
      reviewDots.querySelectorAll(".customer-review__dot"),
    );
  }

  reviewDotButtons.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      const slide = reviewSlides[index];

      if (!slide) {
        return;
      }

      slide.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    });
  });

  const setActiveReviewDot = () => {
    const trackCenter = reviewTrack.scrollLeft + reviewTrack.offsetWidth / 2;
    let closestDistance = Infinity;

    reviewSlides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(trackCenter - slideCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        activeReviewIndex = index;
      }
    });

    reviewDotButtons.forEach((dot, index) => {
      const isActive = index === activeReviewIndex;

      dot.classList.toggle("is-active", isActive);

      if (isActive) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  };

  const goToReview = (index) => {
    const slide = reviewSlides[index];

    if (!slide) {
      return;
    }

    slide.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  reviewTrack.addEventListener(
    "scroll",
    () => {
      window.cancelAnimationFrame(reviewAnimationFrame);
      reviewAnimationFrame = window.requestAnimationFrame(setActiveReviewDot);
    },
    { passive: true },
  );

  window.setInterval(() => {
    goToReview((activeReviewIndex + 1) % reviewSlides.length);
  }, 4000);
}
