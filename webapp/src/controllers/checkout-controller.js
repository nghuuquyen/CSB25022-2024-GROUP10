const getCheckout = async (req, res) => {
    return res.render('pages/checkout');
};

const getThankYou = async (req, res) => {
    return res.render('pages/thank-you');
};

export { getCheckout, getThankYou };
