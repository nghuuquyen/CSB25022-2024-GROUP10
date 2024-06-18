let slideIndex = 1;
let autoSlideInterval;

function showSlides(n) {
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].classList.add("hidden");
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" bg-gray-800", "");
  }

  slides[slideIndex - 1].style.display = "block";
  slides[slideIndex - 1].classList.remove("hidden");
  dots[slideIndex - 1].className += " bg-gray-800";

  autoSlideInterval = setTimeout(() => plusSlides(1), 5000); // Change slide every 5 seconds
}

function plusSlides(n) {
  clearTimeout(autoSlideInterval);
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  clearTimeout(autoSlideInterval);
  showSlides(slideIndex = n);
}

function showButtons() {
  let buttons = document.querySelectorAll('.prev, .next');
  buttons.forEach(button => {
    button.classList.remove('hidden');
  });
  clearTimeout(autoSlideInterval);
}

function hideButtons() {
  let buttons = document.querySelectorAll('.prev, .next');
  buttons.forEach(button => {
    button.classList.add('hidden');
  });
  autoSlideInterval = setTimeout(() => plusSlides(1), 5000);
}

// Initialize the slideshow
document.addEventListener("DOMContentLoaded", function() {
  showSlides(slideIndex);
});




let bestSellerIndex = 0;
let autoBestSellerSlideInterval;

function showBestSellerSlides(n) {
  let i;
  let slides = document.getElementsByClassName("best-seller-slide");
  let dots = document.getElementsByClassName("best_seller_dot");

  if (n >= slides.length) { bestSellerIndex = 0; }
  if (n < 0) { bestSellerIndex = slides.length - 1; }

  for (i = 0; i < slides.length; i++) {
    slides[i].classList.add("hidden");
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove("bg-gray-700");
    dots[i].classList.add("bg-gray-400");
  }

  slides[bestSellerIndex].classList.remove("hidden");
  dots[bestSellerIndex].classList.remove("bg-gray-400");
  dots[bestSellerIndex].classList.add("bg-gray-700");
}

function plusBestSellerSlides(n) {
  clearInterval(autoBestSellerSlideInterval);
  showBestSellerSlides(bestSellerIndex += n);
  startAutoBestSellerSlide();
}

function currentBestSellerSlide(n) {
  clearInterval(autoBestSellerSlideInterval);
  showBestSellerSlides(bestSellerIndex = n);
  startAutoBestSellerSlide();
}

function startAutoBestSellerSlide() {
  autoBestSellerSlideInterval = setInterval(() => {
    showBestSellerSlides(bestSellerIndex += 1);
  }, 3000);
}

// Initial setup
showBestSellerSlides(bestSellerIndex);
startAutoBestSellerSlide();
