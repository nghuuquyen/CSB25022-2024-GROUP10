document.addEventListener('DOMContentLoaded', (event) => {
    
    const searchIcon = document.getElementById('search-icon');
    const searchOverlay = document.getElementById('search-overlay');
    const closeOverlay = document.getElementById('close-overlay');
  
    searchIcon.addEventListener('click', () => {
      searchOverlay.classList.remove('hidden');
    });
  
    closeOverlay.addEventListener('click', () => {
      searchOverlay.classList.add('hidden');
    });
  
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) {
        searchOverlay.classList.add('hidden');
      }
    });
  });
  