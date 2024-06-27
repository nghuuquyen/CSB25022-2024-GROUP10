const getCheckout = async (req, res) => {
    const pageTitle = 'Checkout';
    const cartItems = req.session.cartItems || [];
    const csrfToken = req.csrfToken(); // Lấy mã thông báo CSRF

    return res.render('pages/checkout', { pageTitle, cartItems, csrfToken });
};

const postCheckout = async (req, res) => {
    req.session.cartItems = req.body.cartItems;
    return res.json({ success: true });
};

const getThankYou = async (req, res) => {
    const pageTitle = 'Thank You';

    return res.render('pages/thank-you', { pageTitle });
};

export { getCheckout, postCheckout, getThankYou };
