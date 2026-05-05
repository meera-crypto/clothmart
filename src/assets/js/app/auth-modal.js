(function () {
  var root = typeof bootstrap !== "undefined" ? bootstrap.Modal : null;
  if (!root) return;

  var authModalEl = document.getElementById("authModal");
  var signupModalEl = document.getElementById("signupModal");
  var loginForm = document.getElementById("auth-login-form");
  var signupForm = document.getElementById("auth-signup-form");
  var openSignupBtn = document.getElementById("auth-open-signup");
  var openLoginBtn = document.getElementById("auth-open-login");

  if (!authModalEl || !signupModalEl || !loginForm || !signupForm) return;

  function getModal(el) {
    return root.getInstance(el) || new root(el);
  }

  function chainAfterHidden(el, fn) {
    el.addEventListener("hidden.bs.modal", function once() {
      el.removeEventListener("hidden.bs.modal", once);
      fn();
    });
    getModal(el).hide();
  }

  if (openSignupBtn) {
    openSignupBtn.addEventListener("click", function (e) {
      e.preventDefault();
      chainAfterHidden(authModalEl, function () {
        getModal(signupModalEl).show();
      });
    });
  }

  if (openLoginBtn) {
    openLoginBtn.addEventListener("click", function (e) {
      e.preventDefault();
      chainAfterHidden(signupModalEl, function () {
        getModal(authModalEl).show();
      });
    });
  }

  var MSG = {
    required: "This field is required.",
    email: "Please enter a valid email address.",
    password:
      "Password must be at least 6 characters with at least one letter and one number.",
    nameDigits: "Name must not contain numbers.",
  };

  function trimVal(v) {
    return (v == null ? "" : String(v)).trim();
  }

  function isValidEmail(email) {
    email = trimVal(email);
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPassword(pw) {
    if (!pw || pw.length < 6) return false;
    if (!/[A-Za-z]/.test(pw)) return false;
    if (!/\d/.test(pw)) return false;
    return true;
  }

  function isValidName(name) {
    name = trimVal(name);
    if (!name) return false;
    if (/\d/.test(name)) return false;
    return true;
  }

  function getFieldFeedback(input) {
    var group = input.closest(".mb-3");
    return group && group.querySelector(".invalid-feedback");
  }

  function setFieldError(input, message) {
    input.classList.add("is-invalid");
    input.setAttribute("aria-invalid", "true");
    var fb = getFieldFeedback(input);
    if (fb) fb.textContent = message;
  }

  function clearFieldError(input) {
    input.classList.remove("is-invalid");
    input.removeAttribute("aria-invalid");
    var fb = getFieldFeedback(input);
    if (fb) fb.textContent = "";
  }

  function bindClearOnInput(form) {
    form.querySelectorAll("input").forEach(function (inp) {
      inp.addEventListener("input", function () {
        clearFieldError(inp);
      });
    });
  }

  bindClearOnInput(loginForm);
  bindClearOnInput(signupForm);

  function resetFormErrors(form) {
    form.querySelectorAll(".is-invalid").forEach(function (inp) {
      clearFieldError(inp);
    });
  }

  authModalEl.addEventListener("show.bs.modal", function () {
    resetFormErrors(loginForm);
    resetPasswordVisibility(loginForm);
  });
  signupModalEl.addEventListener("show.bs.modal", function () {
    resetFormErrors(signupForm);
    resetPasswordVisibility(signupForm);
  });

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = document.getElementById("auth-login-email");
    var pw = document.getElementById("auth-login-password");
    if (!email || !pw) return;

    clearFieldError(email);
    clearFieldError(pw);
    var ok = true;

    if (!trimVal(email.value)) {
      setFieldError(email, MSG.required);
      ok = false;
    } else if (!isValidEmail(email.value)) {
      setFieldError(email, MSG.email);
      ok = false;
    }

    if (!trimVal(pw.value)) {
      setFieldError(pw, MSG.required);
      ok = false;
    } else if (!isValidPassword(pw.value)) {
      setFieldError(pw, MSG.password);
      ok = false;
    }

    if (!ok) return;
  });

  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var nameIn = document.getElementById("auth-signup-name");
    var emailIn = document.getElementById("auth-signup-email");
    var pwIn = document.getElementById("auth-signup-password");
    if (!nameIn || !emailIn || !pwIn) return;

    clearFieldError(nameIn);
    clearFieldError(emailIn);
    clearFieldError(pwIn);
    var ok = true;

    if (!trimVal(nameIn.value)) {
      setFieldError(nameIn, MSG.required);
      ok = false;
    } else if (!isValidName(nameIn.value)) {
      setFieldError(nameIn, MSG.nameDigits);
      ok = false;
    }

    if (!trimVal(emailIn.value)) {
      setFieldError(emailIn, MSG.required);
      ok = false;
    } else if (!isValidEmail(emailIn.value)) {
      setFieldError(emailIn, MSG.email);
      ok = false;
    }

    if (!trimVal(pwIn.value)) {
      setFieldError(pwIn, MSG.required);
      ok = false;
    } else if (!isValidPassword(pwIn.value)) {
      setFieldError(pwIn, MSG.password);
      ok = false;
    }

    if (!ok) return;
  });

  function resetPasswordVisibility(form) {
    form.querySelectorAll(".auth-modal__password-input").forEach(function (inp) {
      inp.type = "password";
    });
    form.querySelectorAll(".auth-modal__toggle-password").forEach(function (btn) {
      btn.setAttribute("aria-pressed", "false");
      btn.setAttribute("aria-label", "Show password");
      var lbl = btn.querySelector(".auth-modal__toggle-label");
      if (lbl) lbl.textContent = "Show";
    });
  }

  document.querySelectorAll(".auth-modal__toggle-password").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("aria-controls");
      var input = id && document.getElementById(id);
      if (!input) return;
      var showPlain = input.type === "password";
      input.type = showPlain ? "text" : "password";
      btn.setAttribute("aria-pressed", showPlain ? "true" : "false");
      btn.setAttribute("aria-label", showPlain ? "Hide password" : "Show password");
      var lbl = btn.querySelector(".auth-modal__toggle-label");
      if (lbl) lbl.textContent = showPlain ? "Hide" : "Show";
    });
  });
})();
