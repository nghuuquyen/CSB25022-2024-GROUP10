const getCheckout = async (req, res) => {
    return res.render('pages/checkout');
};

const getThankYou = async (req, res) => {
    return res.render('pages/thank_you');
};

export { getCheckout, getThankYou };