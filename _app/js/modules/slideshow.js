export default function Slideshow(selector, interval = 3000) {
	let slideIndex = 0;
	const slides = document.querySelectorAll(selector);
	const totalImages = slides.length;
 
	// Create Prev button
	const prevButton = document.createElement("button");
	prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
	prevButton.className = "prev";
	prevButton.addEventListener("click", showPrevSlide);

	// Create Next button
	const nextButton = document.createElement("button");
	nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
	nextButton.className = "next";
	nextButton.addEventListener("click", showNextSlide);
 
	// Create Slideshow container and add buttons and image display to it
	const slideshowContainer = document.querySelector(".car__images");
	slideshowContainer.appendChild(prevButton);
	slideshowContainer.appendChild(nextButton);
 
	const imageDisplay = document.createElement("p");
	imageDisplay.className = "image-display";
	slideshowContainer.appendChild(imageDisplay);
 
	function showNextSlide() {
	  slides.forEach((slide) => {
		 slide.style.display = "none";
	  });
 
	  slideIndex = (slideIndex + 1) % slides.length;
	  slides[slideIndex].style.display = "block";
 
	  updateImageDisplay();
	}
 
	function showPrevSlide() {
	  slides.forEach((slide) => {
		 slide.style.display = "none";
	  });
 
	  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
	  slides[slideIndex].style.display = "block";
 
	  updateImageDisplay();
	}
 
	function updateImageDisplay() {
	  const imageDisplay = document.querySelector(".image-display");
	  if (imageDisplay) {
		 imageDisplay.textContent = `${slideIndex + 1}/${totalImages}`;
	  }
	}
 
	showNextSlide(); // Start with the first slide
	setInterval(showNextSlide, interval); // Change the slide every 'interval' milliseconds
 }
 