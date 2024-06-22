import express from 'express';
import contactController from './controllers/contact-controller.js';
import productController from './controllers/product-controller.js';
import { contactValidator } from './validators/index.js';

const router = express.Router();

/** Posts **/
router.get('/posts', productController.getProducts);
router.get('/posts/:id', productController.getProductById);

/** Contact **/
router.post('/contact', contactValidator, contactController.createContact);

export default router;
