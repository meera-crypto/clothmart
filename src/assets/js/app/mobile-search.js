(function () {
  var mq = window.matchMedia("(max-width: 767px)");
  var headerTop = document.querySelector(".header-top");
  var searchShell = document.querySelector(".header-top-end");
  var toggleBtn = document.querySelector(".mobile-search-toggle");

  if (!headerTop || !toggleBtn || !searchShell) return;

  var searchInput = document.getElementById("search-input");

  function setExpanded(open) {
    toggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  function closeSearch() {
    headerTop.classList.remove("header-top--search-active");
    setExpanded(false);
  }

  function openSearch() {
    headerTop.classList.add("header-top--search-active");
    setExpanded(true);
    if (searchInput) {
      searchInput.focus();
    }
  }

  toggleBtn.addEventListener("click", function () {
    if (!mq.matches) return;
    if (headerTop.classList.contains("header-top--search-active")) {
      closeSearch();
    } else {
      openSearch();
    }
  });

  document.addEventListener(
    "pointerdown",
    function (e) {
      if (!mq.matches || !headerTop.classList.contains("header-top--search-active")) {
        return;
      }
      if (searchShell.contains(e.target)) return;
      closeSearch();
    },
    true
  );

  mq.addEventListener("change", function (e) {
    if (!e.matches) {
      closeSearch();
    }
  });
})();
