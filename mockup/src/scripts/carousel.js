document.addEventListener('DOMContentLoaded', () => {
  let slideIndex = 0;
  let autoSlideInterval;
  const slidesContainer = document.querySelector('.slides-container');
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length - 1; // Excluding the duplicate slide
  const bestSellerSlides = document.getElementsByClassName('best-seller-slide');
  const bestSellerDots = document.getElementsByClassName('best_seller_dot');
  let bestSellerIndex = 0;
  let autoBestSellerSlideInterval;

  function showSlides() {
      const dots = document.getElementsByClassName('dot');

      if (slideIndex >= totalSlides) {
          slidesContainer.style.transition = 'transform 1s ease-in-out'; // Enable transition for smooth slide
          slidesContainer.style.transform = `translateX(${-slideIndex * 100}%)`;
          slideIndex = 0;
          setTimeout(() => {
              slidesContainer.style.transition = 'none'; // Disable transition for instant move
              slidesContainer.style.transform = 'translateX(0%)';
          }, 1000); // Small delay to allow the transition to complete
      } else if (slideIndex < 0) {
          slidesContainer.style.transition = 'none'; // Disable transition for instant move
          slidesContainer.style.transform = `translateX(${-totalSlides * 100}%)`;
          slideIndex = totalSlides - 1;
          setTimeout(() => {
              slidesContainer.style.transition = 'transform 1s ease-in-out'; // Re-enable transition
              slidesContainer.style.transform = `translateX(${-slideIndex * 100}%)`;
          }, 50); // Small delay to allow the DOM to update
      } else {
          slidesContainer.style.transition = 'transform 1s ease-in-out'; // Enable transition for smooth slide
          slidesContainer.style.transform = `translateX(${-slideIndex * 100}%)`;
      }

      // Update dots
      for (let i = 0; i < dots.length; i++) {
          dots[i].classList.remove('bg-gray-700');
          dots[i].classList.add('bg-gray-400');
      }

      if (slideIndex === totalSlides || slideIndex === 0) {
          dots[0].classList.remove('bg-gray-400');
          dots[0].classList.add('bg-gray-700');
      } else {
          dots[slideIndex].classList.remove('bg-gray-400');
          dots[slideIndex].classList.add('bg-gray-700');
      }
  }

  function plusSlides(n) {
      clearInterval(autoSlideInterval);
      slideIndex += n;
      showSlides();
      startAutoSlide();
  }

  function currentSlide(n) {
      clearInterval(autoSlideInterval);
      slideIndex = n - 1;
      showSlides();
      startAutoSlide();
  }

  function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
          slideIndex++;
          showSlides();
      }, 6000);
  }

  function showBestSellerSlides(n) {
      if (n >= bestSellerSlides.length) {
          bestSellerIndex = 0;
      }
      if (n < 0) {
          bestSellerIndex = bestSellerSlides.length - 1;
      }

      for (let i = 0; i < bestSellerSlides.length; i++) {
          bestSellerSlides[i].classList.add('hidden');
          bestSellerSlides[i].classList.remove('slide-down', 'slide-up');
      }
      for (let i = 0; i < bestSellerDots.length; i++) {
          bestSellerDots[i].classList.remove('bg-gray-700');
          bestSellerDots[i].classList.add('bg-gray-400');
      }

      if (bestSellerSlides[bestSellerIndex].classList.contains('hidden')) {
          bestSellerSlides[bestSellerIndex].classList.remove('hidden');
          bestSellerSlides[bestSellerIndex].classList.add('slide-down');
      }

      bestSellerDots[bestSellerIndex].classList.remove('bg-gray-400');
      bestSellerDots[bestSellerIndex].classList.add('bg-gray-700');
  }

  function plusBestSellerSlides(n) {
      bestSellerSlides[bestSellerIndex].classList.add('slide-up');

      clearInterval(autoBestSellerSlideInterval);
      setTimeout(() => {
          showBestSellerSlides((bestSellerIndex += n));
          startAutoBestSellerSlide();
      }, 2000); // Wait for slide-up animation to complete
  }

  function currentBestSellerSlide(n) {
      bestSellerSlides[bestSellerIndex].classList.add('slide-up');

      clearInterval(autoBestSellerSlideInterval);
      setTimeout(() => {
          showBestSellerSlides((bestSellerIndex = n));
          startAutoBestSellerSlide();
      }, 2000); // Wait for slide-up animation to complete
  }

  function startAutoBestSellerSlide() {
      autoBestSellerSlideInterval = setInterval(() => {
          plusBestSellerSlides(1);
      }, 4000); // Increase interval duration
  }

  function deleteSlide() {
      clearInterval(autoBestSellerSlideInterval);
  }

  // Initialize sliders
  showSlides();
  startAutoSlide();
  showBestSellerSlides(bestSellerIndex);
  startAutoBestSellerSlide();

  // Attach functions to window object for accessibility
  window.plusSlides = plusSlides;
  window.currentSlide = currentSlide;
  window.plusBestSellerSlides = plusBestSellerSlides;
  window.currentBestSellerSlide = currentBestSellerSlide;
  window.deleteSlide = deleteSlide;
});
