// // notatnik z zajęć

// let index = 0;

// const main = document.querySelector('main')
// const slides = document.querySelector('#slides')

// // zmiana styli css elementu
// main.style.transform = "translateX(-10px)"

// // zmiana klasy css elementu
// main.classList.add() // .remove(), .toggle()

// // jednorazowe wykonanie kodu po określonym czasie
// const timeoutRef = setTimeout(
//     () => {
//         //main.innerHTML = 'Msg from setTimeout'
//         main.innerHTML = slides.className.toString()
//         slides.className
//     },
//     2000
// )

// // wykonywanie kodu co określony czas
// let licznik = 0
// const intervalRef = setInterval(
//     () => {
//         //main.innerHTML = `Msg from setInterval: ${licznik++}`
//         main.innerHTML = slides.className
//     },
//     4000
// )

// // kasujemy setInterval
// // clearInterval(intervalRef)

// // kasujemy setTimeout
// // clearTimeout(intervalRef)


// // window.requestAnimationFrame

// js code
const slider = document.querySelector('#slider');
const slides = document.querySelector('.slides');
const btnPause = document.querySelector('#btnPause')
const btnFwd = document.querySelector('#btnFwd')
const btnRev = document.querySelector('#btnRev')


const slideWidth = slider.offsetWidth; // get the width of the slider
const slideCount = slides.childElementCount; // get the number of slides
let currentSlide = 0; // keep track of the current slide index
let intervalId;

function nextSlide(){
    moveSlides(true);
}

function prevSlide(){
    moveSlides(false);
}

// create a function to move the slides
function moveSlides(next = true) {
  // calculate the new position of the slides
  let newPosition = -currentSlide * 100;
  // apply the transform property to the slides element
  slides.style.transform = `translateX(${newPosition}%)`;
  // increment the current slide index
  next ? currentSlide++ : currentSlide--;
  // if the current slide index reaches the slide count, reset it to zero
  if (currentSlide === slideCount) {
    currentSlide = 0;
  }
  if (currentSlide < 0) {
    currentSlide = slideCount -1;
  }
}

// create a function to loop the slides
function loopSlides() {
  // call the moveSlides function every 4 seconds
  intervalId = setInterval(moveSlides, 4000);
}

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
}

// call the loopSlides function when the page loads
window.addEventListener('load', initialize);

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