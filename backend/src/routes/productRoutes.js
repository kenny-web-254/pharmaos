import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  adjustStock,
  getLowStockProducts,
  getProductCategories,
  createProductCategory,
} from '../controllers/productController.js';
import { authenticate, verifyOrganization, requirePermission } from '../middleware/auth.js';

const router = express.Router();

// Product routes
router.get('/:organizationId/products', authenticate, verifyOrganization, getProducts);
router.get('/:organizationId/products/low-stock', authenticate, verifyOrganization, getLowStockProducts);
router.get('/:organizationId/products/:productId', authenticate, verifyOrganization, getProductById);
router.post('/:organizationId/products', authenticate, verifyOrganization, createProduct);
router.put('/:organizationId/products/:productId', authenticate, verifyOrganization, updateProduct);
router.delete('/:organizationId/products/:productId', authenticate, verifyOrganization, deleteProduct);
router.post('/:organizationId/products/:productId/adjust-stock', authenticate, verifyOrganization, adjustStock);

// Category routes
router.get('/:organizationId/categories', authenticate, verifyOrganization, getProductCategories);
router.post('/:organizationId/categories', authenticate, verifyOrganization, createProductCategory);

export default router;
