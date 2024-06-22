document.addEventListener('DOMContentLoaded', (event) => {
    const searchIcon = document.getElementById('search-icon');
    const searchOverlay = document.getElementById('search-overlay');
    const closeOverlay = document.getElementById('close-overlay');

    const disablePageInteraction = () => {
        document.body.classList.add('no-scroll');
    };

    const enablePageInteraction = () => {
        document.body.classList.remove('no-scroll');
    };

    searchIcon.addEventListener('click', () => {
        searchOverlay.classList.remove('hidden');
        disablePageInteraction();
    });

    closeOverlay.addEventListener('click', () => {
        searchOverlay.classList.add('hidden');
        enablePageInteraction();
    });

    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.classList.add('hidden');
            enablePageInteraction();
        }
    });
});
