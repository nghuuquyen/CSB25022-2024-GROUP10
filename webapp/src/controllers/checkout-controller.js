const getCheckout = async (req, res) => {
    return res.render('pages/menu');
};

const getThankYou = async (req, res) => {
    return res.render('pages/thank_you');
};

export { getCheckout, getThankYou };