const slider = document.querySelector('#slider');
const slides = document.querySelector('.slides');
const btnPause = document.querySelector('#btnPause')
const btnFwd = document.querySelector('#btnFwd')
const btnRev = document.querySelector('#btnRev')
const btnPrev = document.querySelector('#btnPrev')
const btnNext = document.querySelector('#btnNext')
const dots = document.querySelector('#dots');

const slideWidth = slider.offsetWidth;
const slideCount = slides.childElementCount;
let currentSlide = 0;
let intervalId;

function initialize() {
  loopSlides()
  btnFwd.addEventListener("click", () => {
    startSlider(true)
    console.log("forward")
  })

  btnRev.addEventListener("click", () => {
    startSlider(false)
    console.log("reverse")
  })

  btnPause.addEventListener("click", () => {
    if (intervalId) {
      pauseSlider()
      btnPause.innerHTML = "Start"
      console.log("paused")
    }
    else {
      startSlider(true)
      btnPause.innerHTML = "Pause"
      console.log("started")
    }
  })

  btnPrev.addEventListener("click", () => {
    moveSlides(true)
    console.log("previous")
  })
  
  btnNext.addEventListener("click", () => {
    moveSlides(false)
    console.log("next")
  })

  createDots();
  updateActiveDot();
}

window.addEventListener('load', initialize);

function nextSlide(){
  moveSlides(true);
}

function prevSlide(){
  moveSlides(false);
}

function moveSlides(next = true) {
  next ? currentSlide++ : currentSlide--;

  if (currentSlide === slideCount) {
    currentSlide = 0;
  }

  if (currentSlide < 0) {
    currentSlide = slideCount -1;
  }

  let newPosition = -currentSlide * 100;
  slides.style.transform = `translateX(${newPosition}%)`;
  
  updateActiveDot();
}

function loopSlides() {
  intervalId = setInterval(moveSlides, 4000);
}

function pauseSlider(){
  clearInterval(intervalId);
  intervalId = undefined;
}

function startSlider(increasing = true) {
  if (intervalId) {
    pauseSlider()
  }
  intervalId = setInterval(moveSlides, 4000, increasing);
}

function createDots() {
  for (let i = 0; i < slideCount; i++) {
    let dot = document.createElement('span');
    dot.className = 'dot';

    dot.addEventListener('click', function() {
      currentSlide = i - 1;
      moveSlides();
    });

    dots.appendChild(dot);
  }
}
  
function updateActiveDot() {
  let dotElements = document.querySelectorAll('.dot');

  for (let dot of dotElements) {
    dot.classList.remove('active');
  }

  dotElements[currentSlide].classList.add('active');
}