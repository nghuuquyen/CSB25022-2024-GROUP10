import express from 'express';
import { getHomepage } from './controllers/homepage-controller.js';
import { getContactForm, createContact, contactSuccess } from './controllers/contact-controller.js';
import { getMenu } from './controllers/menu-controller.js';
import { getCart } from './controllers/cart-controller.js';
import { getCheckout, postCheckout, getThankYou } from './controllers/checkout-controller.js';
import { contactValidator } from './validators/index.js';

const router = express.Router();

/** Homepage **/
router.get('/', getHomepage);

/** Menu **/
router.get('/menu', getMenu);

/** Cart **/
router.get('/cart', getCart);

/** Checkout **/
router.get('/checkout', getCheckout);
router.post('/checkout', postCheckout); // Thêm route POST
router.get('/thank-you', getThankYou);

/** Contact **/
router.get('/contact', getContactForm);
router.post('/contact', contactValidator, createContact);
router.get('/contact-success', contactSuccess);

export default router;
