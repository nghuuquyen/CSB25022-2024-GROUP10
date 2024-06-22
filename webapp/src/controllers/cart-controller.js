const getCart = async (req, res) => {
    const pageTitle = 'Cart';

    return res.render('pages/cart', { pageTitle });
};

export { getCart };
