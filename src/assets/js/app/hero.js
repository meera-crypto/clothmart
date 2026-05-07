(function () {
  if (typeof Swiper === "undefined") return;
  if (!document.querySelector(".swiper")) return;

  new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      768: {
        navigation: false,
      },
    },
  });
})();