"use strict";

// Menu

const menuBlock = document.querySelector(".header_menu_block");
let subMenuButtons = document.querySelectorAll(".menu_item_sub_menu");
const menuBurgerBtn = document.querySelector(".menu_burger_btn");

function showSubMenu(event) {
  if (!event.target.closest(".menu_item_sub_menu")) {
    return;
  }

  let target = event.target.closest(".menu_item_sub_menu");
  target.classList.toggle("active");
}

function hideSubMenuAfterLink(event) {
  if (event.target.closest("a")) {
    for (let item of subMenuButtons) {
      if (item.classList.contains("active")) {
        item.classList.remove("active");
      }
    }
  }
}

function showHideMainMenu() {
  menuBlock.classList.toggle("visible");

  for (let item of subMenuButtons) {
    if (item.classList.contains("active")) {
      item.classList.remove("active");
    }
  }
}

function hideMenuAfterLink(event) {
  if (event.target.closest("a") && menuBlock.classList.contains("visible")) {
    menuBlock.classList.remove("visible");

    for (let item of subMenuButtons) {
      if (item.classList.contains("active")) {
        item.classList.remove("active");
      }
    }
  }
}

function menuBehavior(event) {
  showSubMenu(event);
  hideMenuAfterLink(event);
  hideSubMenuAfterLink(event);
}

function controlCloseMenu(event) {
  if (
    event.target.closest(".header_menu_block") ||
    event.target.closest(".menu_burger_btn")
  )
    return;
  if (menuBlock.classList.contains("visible")) {
    menuBlock.classList.remove("visible");
  }
  for (let item of subMenuButtons) {
    if (item.classList.contains("active")) {
      item.classList.remove("active");
    }
  }
}

document.documentElement.addEventListener("click", controlCloseMenu);
menuBlock.addEventListener("click", menuBehavior);
menuBurgerBtn.addEventListener("click", showHideMainMenu);

//COUNTERS

const counters = document.querySelectorAll(".counter_count");

function runCounter(element) {
  let target = element;
  let targetValue = target.textContent;
  let finalValue = parseFloat(targetValue);
  let startTime = new Date();
  let duration = target.dataset.duration ? target.dataset.duration : 1000;
  let currentValue = 0;

  function step() {
    let controlTime = new Date() - startTime;
    let coefficient = controlTime < duration ? controlTime / duration : 1;
    currentValue = Math.trunc(finalValue * coefficient);
    target.textContent =
      currentValue != finalValue ? currentValue : targetValue;

    if (currentValue < finalValue) {
      window.requestAnimationFrame(step);
    }
  }
  window.requestAnimationFrame(step);
}

let options = {
  root: null,
  threshold: 0.3,
};

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let target = entry.target;
      runCounter(target);
      observer.unobserve(target);
    }
  });
}, options);

if (counters.length) {
  counters.forEach((item) => {
    observer.observe(item);
  });
}

//Welcome slider

const welcomeSliderLine = document.querySelector(".page_welcome_slider_line");
const welcomeSliderBtnsBlock = document.querySelector(
  ".page_welcome_slider_btns"
);
let welcomeSliderBtns = document.querySelectorAll(".page_welcome_slider_btn");
let welcomeSlides = document.querySelectorAll(".page_welcome_item");
let welcomeSlideIndex = 0;
let welcomeSlideWidth = welcomeSlides[0].offsetWidth;
let welcomeSliderInterval = null;

function nextWelcomeSlide() {
  for (let slide of welcomeSlides) {
    if (slide.classList.contains("active")) {
      slide.classList.remove("active");
    }
  }
  for (let btn of welcomeSliderBtns) {
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
    }
  }
  welcomeSlideIndex =
    welcomeSlideIndex < welcomeSlides.length - 1 ? ++welcomeSlideIndex : 0;

  setTimeout(() => {
    welcomeSlides[welcomeSlideIndex].classList.add("active");
    welcomeSliderBtns[welcomeSlideIndex].classList.add("active");
    welcomeSliderLine.style.transform = `translateX(-${
      welcomeSlideIndex * welcomeSlideWidth
    }px)`;
  }, 300);
}

function actionWelcomeBtn(event) {
  clearInterval(welcomeSliderInterval);
  if (!event.target.closest(".page_welcome_slider_btn")) {
    return;
  }
  let target = event.target.closest(".page_welcome_slider_btn");
  let buttonIndex = +target.dataset.index;

  if (buttonIndex == welcomeSlideIndex) {
    return;
  }

  welcomeSlideIndex = buttonIndex;

  for (let slide of welcomeSlides) {
    if (slide.classList.contains("active")) {
      slide.classList.remove("active");
    }
  }
  for (let btn of welcomeSliderBtns) {
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
    }
  }

  setTimeout(() => {
    welcomeSlides[welcomeSlideIndex].classList.add("active");
    welcomeSliderBtns[welcomeSlideIndex].classList.add("active");
    welcomeSliderLine.style.transform = `translateX(-${
      welcomeSlideIndex * welcomeSlideWidth
    }px)`;
    welcomeSliderInterval = setInterval(nextWelcomeSlide, 6000);
  }, 300);
}

function correctWelcomeSlider() {
  welcomeSlideWidth = welcomeSlides[0].offsetWidth;
  welcomeSliderLine.style.transform = `translateX(-${
    welcomeSlideIndex * welcomeSlideWidth
  }px)`;
}

welcomeSliderInterval = setInterval(nextWelcomeSlide, 6000);

welcomeSliderBtnsBlock.addEventListener("click", actionWelcomeBtn);

//Response slider

const responseSliderLine = document.querySelector(".response_slider_line");
let responseSlides = document.querySelectorAll(".response_slider_item");
const responseSliderPrevBtn = document.querySelector(".response_slider_prev");
const responseSliderNextBtn = document.querySelector(".response_slider_next");

let responseCloneSlides = [];

for (let slide of responseSlides) {
  let clone = slide.cloneNode(true);
  responseCloneSlides.push(clone);
}

let responseSlideIndex = 0;
let responseSlideWidth = responseSlides[0].offsetWidth;
let responseSliderStyles = getComputedStyle(responseSliderLine);
let responSliderAnimationDuration =
  parseFloat(responseSliderStyles.transitionDuration) * 1000;

function nextResponseSlide() {
  responseSliderNextBtn.removeEventListener("click", nextResponseSlide);
  responseSliderPrevBtn.removeEventListener("click", prevResponseSlide);

  if (!responseSliderLine.classList.contains("active")) {
    responseSliderLine.classList.add("active");
  }
  responseSlides = document.querySelectorAll(".response_slider_item");
  let slidesForEdit = [];

  for (let slide of responseCloneSlides) {
    let clone = slide.cloneNode(true);
    slidesForEdit.push(clone);
  }

  responseSliderLine.append(slidesForEdit[responseSlideIndex]);

  setTimeout(() => {
    if (responseSliderLine.classList.contains("active")) {
      responseSliderLine.classList.remove("active");
    }
    responseSliderLine.style.transform = `translateX(-${responseSlideWidth}px)`;
  }, 0);

  setTimeout(() => {
    responseSlides = document.querySelectorAll(".response_slider_item");
    if (!responseSliderLine.classList.contains("active")) {
      responseSliderLine.classList.add("active");
    }

    responseSlides[0].remove();
    responseSliderLine.style.transform = `translateX(0px)`;

    if (responseSlideIndex < responseCloneSlides.length - 1) {
      responseSlideIndex++;
    } else {
      responseSlideIndex = 0;
    }

    responseSliderNextBtn.addEventListener("click", nextResponseSlide);
    responseSliderPrevBtn.addEventListener("click", prevResponseSlide);
  }, responSliderAnimationDuration);
}

function prevResponseSlide() {
  responseSliderNextBtn.removeEventListener("click", nextResponseSlide);
  responseSliderPrevBtn.removeEventListener("click", prevResponseSlide);

  if (!responseSliderLine.classList.contains("active")) {
    responseSliderLine.classList.add("active");
  }

  responseSlides = document.querySelectorAll(".response_slider_item");

  let slidesForEdit = [];

  for (let slide of responseCloneSlides) {
    let clone = slide.cloneNode(true);
    slidesForEdit.push(clone);
  }

  if (responseSlideIndex == 0) {
    responseSlideIndex = responseCloneSlides.length - 1;
  } else {
    responseSlideIndex--;
  }

  responseSliderLine.style.transform = `translateX(-${responseSlideWidth}px)`;
  responseSliderLine.prepend(slidesForEdit[responseSlideIndex]);

  setTimeout(() => {
    if (responseSliderLine.classList.contains("active")) {
      responseSliderLine.classList.remove("active");
    }
    responseSliderLine.style.transform = `translateX(0px)`;
  }, 0);

  setTimeout(() => {
    responseSlides = document.querySelectorAll(".response_slider_item");
    responseSlides[responseSlides.length - 1].remove();

    responseSliderNextBtn.addEventListener("click", nextResponseSlide);
    responseSliderPrevBtn.addEventListener("click", prevResponseSlide);
  }, responSliderAnimationDuration);
}

function correctResponseSlider() {
  responseSlides = document.querySelectorAll(".response_slider_item");
  responseSlideWidth = responseSlides[0].offsetWidth;
}

responseSliderNextBtn.addEventListener("click", nextResponseSlide);
responseSliderPrevBtn.addEventListener("click", prevResponseSlide);

window.addEventListener("resize", () => {
  correctWelcomeSlider();
  correctResponseSlider();
});

// Page Up

const pageUpBtn = document.querySelector(".page_up_btn");
let verticalScrollPageValue = window.pageYOffset;

function pageUpBtnVisibility() {
  verticalScrollPageValue = window.pageYOffset;
  if (verticalScrollPageValue > document.documentElement.clientHeight / 2) {
    if (!pageUpBtn.classList.contains("visible")) {
      pageUpBtn.classList.add("visible");
    }
  } else {
    pageUpBtn.classList.remove("visible");
  }
}

function pageUp() {
  if (verticalScrollPageValue > 0) {
    scrollBy(0, -45);
    setTimeout(pageUp, 0);
  }
}

pageUpBtn.addEventListener("click", pageUp);
window.addEventListener("scroll", pageUpBtnVisibility);
