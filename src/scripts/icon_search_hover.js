document.addEventListener('DOMContentLoaded', (event) => {
    // Lấy các phần tử search icon và search overlay
    const searchIcon = document.getElementById('search-icon');
    const searchOverlay = document.getElementById('search-overlay');
    const closeOverlay = document.getElementById('close-overlay');
  
    // Thêm sự kiện click cho search icon để hiện overlay
    searchIcon.addEventListener('click', () => {
      searchOverlay.classList.remove('hidden');
    });
  
    // Thêm sự kiện click cho nút đóng để ẩn overlay
    closeOverlay.addEventListener('click', () => {
      searchOverlay.classList.add('hidden');
    });
  
    // Tùy chọn: Thêm sự kiện click để đóng overlay khi click bên ngoài
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) {
        searchOverlay.classList.add('hidden');
      }
    });
  });
  