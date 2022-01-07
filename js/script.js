
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





//include html components
//https://www.w3schools.com/howto/howto_html_include.asp

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

includeHTML();



//scroll into viewBox
//https://codepen.io/chriscoyier/pen/DjmJe

//vanilla js toolkit
//https://vanillajstoolkit.com/
