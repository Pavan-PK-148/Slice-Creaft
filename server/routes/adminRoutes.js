import express from 'express';
import upload from '../middleware/upload.js';
import { protect, admin } from '../middleware/auth.js';
import { createProductTemplate, getProductTemplates, deleteProductTemplate } from '../controllers/productController.js';

const router = express.Router();

router.route('/products')
  .get(getProductTemplates)
  .post(protect, admin, upload.single('pizzaImage'), createProductTemplate);

router.route('/products/:id')
  .delete(protect, admin, deleteProductTemplate);

export default router;