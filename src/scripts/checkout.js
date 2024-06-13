document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch and render cart data
    function fetchCartData() {
        fetch('/path/to/your/cart.json')  // Ensure the path is correct and points to a JSON endpoint
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(cartData => {
                renderCart(cartData);
            })
            .catch(error => {
                console.error('Error fetching cart data:', error);
            });
    }

    // Function to render cart data in the order section
    function renderCart(cartData) {
        const orderTableBody = document.querySelector('.order-section tbody');
        const totalOrder = document.querySelector('.total-order span');
        const shipping = document.querySelector('.shipping span');
        const voucher = document.querySelector('.voucher span');
        const totalAmount = document.querySelector('.total-amount span');

        orderTableBody.innerHTML = ''; // Clear existing items

        cartData.items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="py-2 border text-center">${item.name}</td>
                <td class="py-2 border text-center">${item.quantity}</td>
                <td class="py-2 border text-center">${item.total} VND</td>
            `;
            orderTableBody.appendChild(row);
        });

        totalOrder.textContent = cartData.totalOrder;
        shipping.textContent = cartData.shipping;
        voucher.textContent = cartData.voucher;
        totalAmount.textContent = cartData.totalAmount;
    }

    // Collect billing form data
    function collectBillingFormData() {
        const billingForm = document.getElementById('billingForm');
        const formData = new FormData(billingForm);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        return data;
    }

    // Fetch and render cart data on page load
    fetchCartData();

    // Event listener for the "Place order" button
    const placeOrderButton = document.querySelector('button[type="submit"]');
    placeOrderButton.addEventListener('click', function(event) {
        event.preventDefault();
        const billingData = collectBillingFormData();
        console.log('Billing Data:', billingData);
        // Here you can send the billingData to your server or process it further
    });
});
