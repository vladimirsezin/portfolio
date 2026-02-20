// Текущий год в подвале
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear().toString();
}

// Плавный скролл по кнопкам
document.querySelectorAll("[data-scroll-to]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const selector = btn.getAttribute("data-scroll-to");
    if (!selector) return;
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Мобильное меню
const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav-toggle");

if (nav && navToggle) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("is-open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
    });
  });
}

// Фильтрация портфолио по категориям
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

if (filterButtons.length && portfolioItems.length) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      filterButtons.forEach((b) => b.classList.remove("is-active"));
      button.classList.add("is-active");

      portfolioItems.forEach((item) => {
        const category = item.getAttribute("data-category");
        if (!filter || filter === "all" || category === filter) {
          item.style.display = "";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

// Форма: базовая валидация и "фейковая" отправка
const form = document.querySelector(".contact-form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector("#name");
    const email = form.querySelector("#email");

    if (!name.value.trim() || !email.value.trim()) {
      alert("Пожалуйста, заполните имя и email.");
      return;
    }

    alert(
      "Спасибо за заявку! Я свяжусь с вами в ближайшее время, чтобы уточнить детали съёмки."
    );
    form.reset();
  });
}

