const getCheckout = async (req, res) => {
    const pageTitle = 'Checkout';

    return res.render('pages/checkout', { pageTitle });
};

const getThankYou = async (req, res) => {
    const pageTitle = 'Thank You';

    return res.render('pages/thank-you', { pageTitle });
};

export { getCheckout, getThankYou };
