document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const purchaseButton = document.getElementById('purchase_btn');
    const cakeDetailOverlay = document.getElementById('cakeDetailOverlay');
    const closeButton = document.getElementById('closeButton');
    const cartIcons = document.querySelectorAll('.cart_icon');
    const orderButtons = document.querySelectorAll('.order_btn');
    const cartButtons = document.querySelectorAll('.cart');

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
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cartItems.forEach(item => {
            const total = item.price * item.quantity;
            totalPrice += total;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-4 py-2 whitespace-nowrap">${item.name}</td>
                <td class="px-4 py-2 whitespace-nowrap">${item.price.toLocaleString()} VND</td>
                <td class="px-4 py-2 whitespace-nowrap">
                    <div class="flex justify-center items-center">
                        <button class="px-3 py-1 bg-black text-white font-bold rounded-l-full" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="px-4 py-1 bg-gray-200 text-center">${item.quantity}</span>
                        <button class="px-3 py-1 bg-black text-white font-bold rounded-r-full" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </td>
                <td class="px-4 py-2 whitespace-nowrap w-32">${total.toLocaleString()} VND</td>
                <td class="px-4 py-2 whitespace-nowrap">
                    <button class="px-3 py-1 bg-gray-500 hover:bg-red-800 text-white font-bold rounded-full" onclick="removeItem(${item.id})">X</button>
                </td>

            `;
            cartItemsContainer.appendChild(row);
        });

        totalPriceElement.innerText = `${totalPrice.toLocaleString()} VND`;
    }

    window.updateQuantity = (id, delta) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const itemIndex = cartItems.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
            cartItems[itemIndex].quantity += delta;

            // Remove item if quantity is zero or less
            if (cartItems[itemIndex].quantity <= 0) {
                cartItems.splice(itemIndex, 1);
            }

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
        window.location.href = 'menu.html';
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
                id: generateProductId(),
                name: productName,
                price: productPrice,
                quantity: 1
            };

            // Add product to cart
            addToCart(item);
            alert('Added to cart!');
        });
    });

    // Loop through each cart button and add an event listener
    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productContainer = button.closest('.product-item');
            const productName = productContainer.querySelector('.text-red-600').textContent;
            const productPriceText = productContainer.querySelector('.text-red-700').textContent;
            const productPrice = parseInt(productPriceText.replace(' VND', '').replace('.', ''));

            const item = {
                id: generateProductId(),
                name: productName,
                price: productPrice,
                quantity: parseInt(productContainer.querySelector('.quantity').value)
            };
            addToCart(item);
            alert('Added to cart!');
        });
    });

    renderCartItems(); // Initial render of cart items
});
