function toggleSlides() {
  const slide1 = document.querySelector('.review-slide-1');
  const slide2 = document.querySelector('.review-slide-2');
  
  if (slide1.classList.contains('hidden')) {
    slide1.classList.remove('hidden');
    slide1.classList.add('flex');
    slide2.classList.remove('flex');
    slide2.classList.add('hidden');
  } else {
    slide1.classList.remove('flex');
    slide1.classList.add('hidden');
    slide2.classList.remove('hidden');
    slide2.classList.add('flex');
  }
}
function startSlideInterval() {
  intervalId = setInterval(toggleSlides, 3000);
}

function stopSlideInterval() {
  clearInterval(intervalId);
}

document.getElementById('review-container').addEventListener('mouseover', stopSlideInterval);
document.getElementById('review-container').addEventListener('mouseout', startSlideInterval);

// Start the interval when the page loads
startSlideInterval();