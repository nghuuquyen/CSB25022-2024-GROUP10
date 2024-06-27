document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('checkoutButton').addEventListener('click', function() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        fetch('/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'CSRF-Token': document.querySelector('input[name="_csrf"]').value // Thêm mã thông báo CSRF vào tiêu đề
            },
            body: JSON.stringify({ cartItems: cartItems })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/checkout';
            } else {
                alert('Error during checkout');
            }
        })
        .catch(error => console.error('Error:', error));
    });

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
    placeOrderButton.addEventListener('click', function (event) {
        event.preventDefault();
        const billingData = collectBillingFormData();
        console.log('Billing Data:', billingData);
        // Here you can send the billingData to your server or process it further
    });
});
