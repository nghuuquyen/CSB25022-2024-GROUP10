document.addEventListener('DOMContentLoaded', function () {
    const cartIcon = document.getElementById('cartIcon');
    const cartPopup = document.getElementById('cartPopup');
    const cartContainer = document.getElementById('cartContainer');

    let isHovering = false; // Biến cờ để theo dõi trạng thái hiển thị của popup

    cartIcon.addEventListener('mouseenter', showCartPopup);
    cartContainer.addEventListener('mouseleave', hideCartPopup);

    // Sự kiện mouseenter để hiển thị popup
    function showCartPopup() {
        const popupContent = document.getElementById('popup-content');
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        if (cartItems.length === 0) {
            popupContent.innerHTML = '<p class="p-4">Your cart is empty</p>';
        } else {
            let totalItems = 0;
            let totalPrice = 0;
            let itemsHTML = cartItems
                .map((item) => {
                    totalItems += item.quantity;
                    const total = item.price * item.quantity;
                    totalPrice += total;
                    return `
                    <div class="p-4 border-b border-gray-300">
                        <div class="font-semibold">${item.name}</div>
                        <div class="pt-2 flex justify-between">
                            <div>Quantity: ${item.quantity}</div>
                            <div>Total: ${total.toLocaleString()} VND</div>
                        </div>
                    </div>
                `;
                })
                .join('');

            itemsHTML += `
                <div class="p-4">
                    <div class="flex justify-between font-semibold">
                        <div>Number of items:</div>
                        <div>${totalItems}</div>
                    </div>
                    <div class="flex justify-between font-semibold">
                        <div>Item total:</div>
                        <div>${totalPrice.toLocaleString()} VND</div>
                    </div>
                    <a href="/cart">
                    <button class="mt-4 w-full bg-red-500 text-white py-2 rounded-md">View cart</button>
                    </a>
                </div>
            `;

            popupContent.innerHTML = itemsHTML;
        }

        cartPopup.classList.remove('hidden');
        isHovering = true; // Đặt biến cờ thành true khi hiển thị popup
    }

    // Sự kiện mouseleave để ẩn popup
    function hideCartPopup() {
        if (!isHovering) {
            // Kiểm tra xem người dùng có rời chuột ra khỏi cả biểu tượng giỏ hàng và popup không
            cartPopup.classList.add('hidden');
        }
        isHovering = false; // Đặt biến cờ thành false khi ẩn popup
    }
});
