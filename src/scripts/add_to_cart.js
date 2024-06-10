document.addEventListener('DOMContentLoaded', () => {
    const purchaseButton = document.getElementById('purchaseButton');
    const cakeDetailOverlay = document.getElementById('cakeDetailOverlay');
    const closeButton = document.getElementById('closeButton');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartIcon = document.getElementById('cart_icon');
    const order_button = document.getElementById('order-btn');

    purchaseButton.addEventListener('click', () => {
        const item = {
            id: 2, // New product with a larger ID
            name: document.getElementById('cakeName').innerText,
            price: parseInt(document.getElementById('cakePrice').innerText.replace(' VND', '')),
            quantity: parseInt(document.getElementById('quantity').value)
        };
        addToCart(item);
        cakeDetailOverlay.classList.add('hidden');
        window.location.href = 'cart.html';
    });

    closeButton.addEventListener('click', () => {
        cakeDetailOverlay.classList.add('hidden');
    });


    // Hàm tạo ID sản phẩm một cách động (cần được cài đặt)
    function generateProductId() {
        // Thực hiện logic tạo ID một cách động ở đây
        return Math.floor(Math.random() * 1000) + 1; // Ví dụ: ID được tạo ngẫu nhiên từ 1 đến 1000
    }

    function addToCart(item) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            cartItems.push(item);
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    window.changeQuantity = (delta) => {
        const quantityInput = document.getElementById('quantity');
        const newQuantity = Math.max(1, parseInt(quantityInput.value) + delta);
        quantityInput.value = newQuantity;
    };

    cartIcon.addEventListener('click', () => {
        // Truy cập và lấy thông tin sản phẩm từ các phần tử HTML tương ứng
        const productContainer = cartIcon.closest('.relative');
        const productName = productContainer.querySelector('.text-red-900').textContent;
        const productPriceText = productContainer.querySelector('.text-red-900').nextElementSibling.textContent;
        const productPrice = parseInt(productPriceText.replace(' VND', '').replace('.', ''));

        // Tạo đối tượng sản phẩm
        const item = {
            id: generateProductId(), // Tạo ID sản phẩm một cách động
            name: productName,
            price: productPrice,
            quantity: 1
        };

        // Thêm sản phẩm vào giỏ hàng
        addToCart(item);
        alert('Added to cart!');
    });

    order_button.addEventListener('click', () => {
        // Truy cập và lấy thông tin sản phẩm từ các phần tử HTML tương ứng
        const productName = orderBtn.parentElement.querySelector('h3').innerText;
        const productDiscountedPrice = orderBtn.parentElement.querySelector('.text-gray-800').innerText;
        const productPrice = parseInt(productDiscountedPrice.replace(' VND', '').replace('.', ''));

        const item = {
            id: generateProductId(),
            name: productName,
            price: productPrice,
            quantity: 1
        };

        // Thêm sản phẩm vào giỏ hàng
        addToCart(item);
        alert('Added to cart!');
    });




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
