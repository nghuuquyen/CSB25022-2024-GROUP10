document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    const renderCartItems = () => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
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
                <td class="py-2 px-4 border-b border-gray-300">${total} VND</td>
                <td class="py-2 px-4 border-b border-gray-300">
                    <button class="px-2 py-1 bg-red-500 text-white rounded-md" onclick="removeItem(${item.id})">X</button>
                </td>
            `;
            cartItemsContainer.appendChild(row);
        });

        totalPriceElement.innerText = `${totalPrice} VND`;
    };

    window.updateQuantity = (id, delta) => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const item = cartItems.find(item => item.id === id);
        if (item) {
            item.quantity = Math.max(1, item.quantity + delta);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCartItems();
        }
    };

    window.removeItem = (id) => {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems = cartItems.filter(item => item.id !== id);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
    };

    window.continueShopping = () => {
        window.location.href = 'index.html';
    };

    renderCartItems();
});
