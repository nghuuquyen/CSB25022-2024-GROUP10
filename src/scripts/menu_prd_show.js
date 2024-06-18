const productItems = document.querySelectorAll('.product-item');
    const prevButton = document.querySelector('.prev-page');
    const nextButton = document.querySelector('.next-page');
    const pageNumberContainer = document.querySelector('.pagination .flex.space-x-1');
    const itemsPerPage = 8;
    let currentPage = 1;

    function showPage(page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        productItems.forEach((item, index) => {
            item.classList.toggle('hidden', index < start || index >= end);
        });
        currentPage = page;
        updatePagination();
    }

    function updatePagination() {
        pageNumberContainer.innerHTML = '';
        const totalPages = Math.ceil(productItems.length / itemsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.classList.add('bg-gray-200', 'p-3', 'rounded-lg', 'hover:bg-gray-300');
            pageButton.textContent = i;
            pageButton.addEventListener('click', () => showPage(i));
            if (i === currentPage) {
                pageButton.classList.add('bg-red-500', 'text-white');
            }
            pageNumberContainer.appendChild(pageButton);
        }
    }

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            showPage(currentPage - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        const totalPages = Math.ceil(productItems.length / itemsPerPage);
        if (currentPage < totalPages) {
            showPage(currentPage + 1);
        }
    });

    // Initial display
    showPage(currentPage);
