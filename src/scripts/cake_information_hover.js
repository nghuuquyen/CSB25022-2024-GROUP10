document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    // Function to format quantity to two digits
    function formatQuantity(quantity) {
        return quantity.toString().padStart(2, '0');
    }

    // Function to show cake detail overlay
    window.showCakeDetail = function(event) {
        const cakeInfo = event.currentTarget.closest('.relative');
        
        if (!cakeInfo) {
            console.error('Could not find cakeInfo element');
            return;
        }

        const cakeNameElement = cakeInfo.querySelector('.text-center .text-red-900');
        const cakePriceElement = cakeInfo.querySelector('.text-center p b');
        const cakeImageElement = cakeInfo.querySelector('img');

        if (!cakeNameElement || !cakePriceElement || !cakeImageElement) {
            console.error('Could not find one of the elements:', {cakeNameElement, cakePriceElement, cakeImageElement});
            return;
        }

        const cakeName = cakeNameElement.innerText;
        const cakePrice = cakePriceElement.innerText;
        const cakeImage = cakeImageElement.src;

        const cakeNameTarget = document.getElementById('cake_name');
        const cakePriceTarget = document.getElementById('cake_price');
        const cakeImageTarget = document.getElementById('cakeImage');

        if (!cakeNameTarget || !cakePriceTarget || !cakeImageTarget) {
            return;
        }

        cakeNameTarget.innerText = cakeName;
        cakePriceTarget.innerText = cakePrice;
        cakeImageTarget.innerHTML = `<img src="${cakeImage}" alt="${cakeName}" class="w-full h-64 bg-gray-300 flex items-center justify-center">`;

        document.getElementById('cakeDetailOverlay').classList.remove('hidden');
    }

    // Function to close cake detail overlay
    window.closeCakeDetail = function() {
        document.getElementById('cakeDetailOverlay').classList.add('hidden');
    }

    // Function to change quantity of cakes
    window.changeQuantity = function(amount) {
        const quantityElement = document.getElementById('quantity');
        let quantity = parseInt(quantityElement.value || '1') + amount;
        quantity = Math.max(1, quantity); // Ensure the quantity does not go below 1
        quantityElement.value = formatQuantity(quantity);
    }

    // Function to update quantity based on user input
    window.updateQuantity = function(input) {
        let value = parseInt(input.value);
        if (isNaN(value) || value < 1) {
            input.value = '';
        } else {
            input.value = formatQuantity(value); // Format input to two digits
        }
    }

    // Add event listeners to view detail buttons
    document.querySelectorAll('.view-detail').forEach(button => {
        button.addEventListener('click', showCakeDetail);
    });

    // Add event listener to close button
    document.getElementById('closeButton').addEventListener('click', closeCakeDetail);

    // Add event listener to overlay
    document.getElementById('cakeDetailOverlay').addEventListener('click', (event) => {
        if (event.target === document.getElementById('cakeDetailOverlay')) {
            closeCakeDetail();
        }
    });

    // Add event listeners for direct input changes
    const quantityInput = document.getElementById('quantity');
    quantityInput.addEventListener('input', function(event) {
        // When input value is changed, update and format quantity
        updateQuantity(event.target);
    });
    quantityInput.addEventListener('blur', function(event) {
        // When the input loses focus, ensure it has a valid value
        if (event.target.value === '') {
            event.target.value = '01';
        }
    });
});
