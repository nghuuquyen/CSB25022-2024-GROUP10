document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const purchaseButton = document.getElementById('purchase_btn');
    const cakeDetailOverlay = document.getElementById('cakeDetailOverlay');
    const closeButton = document.getElementById('closeButton');
    const cartIcons = document.querySelectorAll('.cart_icon'); // Corrected the selector to .cart_icon
    const orderButtons = document.querySelectorAll('.order_btn');

    // Function to generate a product ID dynamically
    function generateProductId() {
        return Math.floor(Math.random() * 1000) + 1; // Example: Random ID between 1 and 1000
    }

    function addToCart(item) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            cartItems.push(item);
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }


    function renderCartItems() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        console.log('Rendering cart items:', cartItems);
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cartItems.forEach(item => {
            const total = item.price * item.quantity;
            totalPrice += total;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="py-2 px-4 border-b border-gray-300">${item.name}</td>
                <td class="py-2 px-4 border-b border-gray-300">${item.price} VND</td>
                <td class="py-2 px-4 border-b border-gray-300">
                    <button class="px-2 py-1 bg-red-500 text-white rounded-md" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="mx-2">${item.quantity}</span>
                    <button class="px-2 py-1 bg-green-500 text-white rounded-md" onclick="updateQuantity(${item.id}, 1)">+</button>
                </td>
                <td class="py-2 px-4 border-b border-gray-300">${total.toLocaleString()} VND</td>
                <td class="py-2 px-4 border-b border-gray-300">
                    <button class="px-2 py-1 bg-red-500 text-white rounded-md" onclick="removeItem(${item.id})">X</button>
                </td>
            `;
            cartItemsContainer.appendChild(row);
        });

        totalPriceElement.innerText = `${totalPrice.toLocaleString()} VND`;
    }

    window.updateQuantity = (id, delta) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const item = cartItems.find(item => item.id === id);
        if (item) {
            item.quantity = Math.max(1, item.quantity + delta);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCartItems(); // Re-render cart items after updating quantity
        }
    };

    window.removeItem = (id) => {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems = cartItems.filter(item => item.id !== id);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems(); // Re-render cart items after removing item
    };

    window.continueShopping = () => {
        window.location.href = 'index.html';
    };

    if (purchaseButton) {
        purchaseButton.addEventListener('click', () => {
            const item = {
                id: generateProductId(),
                name: document.getElementById('cake_name').textContent.trim(),
                price: parseInt(document.getElementById('cake_price').textContent.replace(' VND', '').replace('.', '')),
                quantity: parseInt(document.getElementById('quantity').value)
            };
            addToCart(item);
            cakeDetailOverlay.classList.add('hidden');
            alert('Added to cart!');
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            cakeDetailOverlay.classList.add('hidden');
        });
    }



    // Loop through each cart icon and add an event listener
    cartIcons.forEach(cartIcon => {
        cartIcon.addEventListener('click', () => {
            // Access product details from corresponding HTML elements
            const productContainer = cartIcon.closest('.relative');
            const productName = productContainer.querySelector('.text-red-900').textContent;
            const productPriceText = productContainer.querySelector('.text-gray-500')
                ? productContainer.querySelector('.text-gray-500').nextElementSibling.textContent
                : productContainer.querySelector('.text-red-900').nextElementSibling.textContent;
            const productPrice = parseInt(productPriceText.replace(' VND', '').replace('.', ''));

            // Create product object
            const item = {
                id: generateProductId(), // Generate product ID dynamically
                name: productName,
                price: productPrice,
                quantity: 1
            };

            // Add product to cart
            addToCart(item);
            alert('Added to cart!');
        });
    });

    // Add event listener to each order button
    orderButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productContainer = button.closest('.flex.items-start');
            const productName = productContainer.querySelector('.text-red-500').textContent;
            const productPriceText = productContainer.querySelector('.text-gray-800').textContent;
            const productPrice = parseInt(productPriceText.replace(' VND', '').replace('.', ''));

            const item = {
                id: generateProductId(), // Generate product ID dynamically
                name: productName,
                price: productPrice,
                quantity: 1
            };

            // Add product to cart
            addToCart(item);
            alert('Added to cart!');
        });
    });

    renderCartItems(); // Initial render of cart items
});
