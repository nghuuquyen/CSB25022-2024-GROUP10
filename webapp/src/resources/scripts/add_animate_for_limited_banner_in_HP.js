document.addEventListener('DOMContentLoaded', function () {
    const offersSection = document.getElementById('offers-section');
    const offerElements = document.querySelectorAll('.hover-animate');

    let previousY = window.scrollY;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const currentY = window.scrollY;

                if (entry.isIntersecting) {
                    if (currentY > previousY) {
                        // Scrolling down
                        triggerAnimation();
                    } else if (currentY < previousY) {
                        // Scrolling up
                        triggerAnimation();
                    }
                }

                previousY = currentY;
            });
        },
        { threshold: 0.5 },
    );

    function triggerAnimation() {
        offerElements.forEach((element) => {
            element.classList.add('animate__animated', 'animate__tada');
            element.addEventListener(
                'animationend',
                () => {
                    element.classList.remove('animate__animated', 'animate__tada');
                },
                { once: true },
            );
        });
    }

    offerElements.forEach((element) => {
        observer.observe(element);
    });
});
