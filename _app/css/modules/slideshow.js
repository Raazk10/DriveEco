// slideshow.js

export default function Slideshow(selector, interval = 3000) {
	let slideIndex = 0;
	const slides = document.querySelectorAll(selector);
 
	function showNextSlide() {
	  slides.forEach((slide) => {
		 slide.style.display = "none";
	  });
 
	  slideIndex = (slideIndex + 1) % slides.length;
	  slides[slideIndex].style.display = "block";
	}
 
	showNextSlide(); // Start with the first slide
	setInterval(showNextSlide, interval); // Change the slide every 'interval' milliseconds
 }
 