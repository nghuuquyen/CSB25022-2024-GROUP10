let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.add("hidden");
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove("bg-gray-700");
    dots[i].classList.add("bg-gray-400");
  }
  slides[slideIndex - 1].classList.remove("hidden");
  dots[slideIndex - 1].classList.remove("bg-gray-400");
  dots[slideIndex - 1].classList.add("bg-gray-700");

  setTimeout(showSlides, 3000); // Change image every 3 seconds
}

function plusSlides(n) {
  slideIndex += n;
  if (slideIndex > document.getElementsByClassName("mySlides").length) { slideIndex = 1 }
  if (slideIndex < 1) { slideIndex = document.getElementsByClassName("mySlides").length }
  showSlides();
}

function currentSlide(n) {
  slideIndex = n;
  showSlides();
}


let bestSellerIndex = 0;
showBestSellerSlides(bestSellerIndex);

function showBestSellerSlides(n) {
  let slides = document.querySelectorAll('.best-seller-slide');
  let dots = document.querySelectorAll('.best_seller_dot');

  if (n >= slides.length) bestSellerIndex = 0;
  if (n < 0) bestSellerIndex = slides.length - 1;

  slides.forEach(slide => slide.classList.add('hidden'));
  slides[bestSellerIndex].classList.remove('hidden');

  dots.forEach(dot => dot.classList.remove('bg-gray-700'));
  dots.forEach(dot => dot.classList.add('bg-gray-400'));
  dots[bestSellerIndex].classList.add('bg-gray-700');
}

function plusBestSellerSlides(n) {
  showBestSellerSlides(bestSellerIndex += n);
}

function currentBestSellerSlide(n) {
  showBestSellerSlides(bestSellerIndex = n - 1);
}

