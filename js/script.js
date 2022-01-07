
//animate section titles wrt scroll position
// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const titleElements = document.querySelectorAll('.section__title');
const titleElement = document.querySelector('.section__title');

const rotateStartX = -7;
const rotateEndX = -2;
const rotateStartY = -25;
const rotateEndY = 100;

function scale(number, inMin, inMax, outMin, outMax) {
  return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function isInViewport(elem) {
  const distance = elem.getBoundingClientRect();
  return (
    distance.bottom >= 0 &&
    distance.right >= 0 &&
    distance.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    distance.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

window.addEventListener('scroll', function(event) {

  for (let i = 0; i < titleElements.length; i++) {
    if (isInViewport(titleElements[i])) {

      const position = titleElements[i].getBoundingClientRect();

      //clipped to min max to consider only within viewport values: Math.min(Math.max(parseInt(number), MIN), MAX);
      const positionTopClippedToRange = Math.min(Math.max(parseInt(position.top), -position.height / 2), window.innerHeight);

      //scaled to rotate values range
      const currX = scale(positionTopClippedToRange, 0, window.innerHeight, rotateStartX, rotateEndX);
      const currY = scale(positionTopClippedToRange, 0, window.innerHeight, rotateStartY, rotateEndY);

      titleElements[i].style.transform = `rotateX(${currX}deg) rotateY(${currY}deg)`;
    }
  }
}, false);






//navigation interaction
const body = document.querySelector("body");
const navButton = document.querySelector(".nav-button");
const closeButton = document.querySelector(".nav-panel__close-button");
const navPanelWrapper = document.querySelector(".nav-panel-wrapper");

navButton.addEventListener("click", function(elem) {
  navPanelWrapper.style.pointerEvents = "auto";
  navPanelWrapper.classList.add("addBlur");
  navPanelWrapper.classList.add("show");
  body.style.overflow = "hidden";
});

closeButton.addEventListener("click", closePanel);
navPanelWrapper.addEventListener("click", closePanel);

function closePanel() {
  navPanelWrapper.style.pointerEvents = "none";
  navPanelWrapper.classList.remove("addBlur");
  navPanelWrapper.classList.remove("show");
  body.style.overflow = "auto";
}






//news card hover interaction
let newsCards = document.getElementsByClassName("news__grid-item");
for (let i = 0; i < newsCards.length; i++) {
  newsCards[i].addEventListener("mouseenter", function() {
    const icon = this.querySelector(".news__grid-item-icon");
    icon.style.transform = "translateX(10%) translateY(-10%)";
  });
  newsCards[i].addEventListener("mouseleave", function() {
    const icon = this.querySelector(".news__grid-item-icon");
    icon.style.transform = "translateX(0%) translateY(0%)";
  });
}





//make elements visible when they scroll into view
const elements = document.querySelectorAll(".scroll-into-view");
const scrollOffset = 20; //in px
window.addEventListener('scroll', function(event) {
  for (let i = 0; i < elements.length; i++) {
    const position = elements[i].getBoundingClientRect();
    if (position.top + scrollOffset < window.innerHeight) {
      elements[i].style.opacity = "1";
    }
  }
}, false);
