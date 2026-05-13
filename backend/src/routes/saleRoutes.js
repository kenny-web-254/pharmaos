import express from 'express';
import {
  createSale,
  getSalesHistory,
  getSaleDetails,
  voidSale,
  getDailySalesReport,
} from '../controllers/saleController.js';
import { authenticate, verifyOrganization } from '../middleware/auth.js';

const router = express.Router();

// Sales routes
router.post('/:organizationId/branches/:branchId/sales', authenticate, verifyOrganization, createSale);
router.get('/:organizationId/branches/:branchId/sales', authenticate, verifyOrganization, getSalesHistory);
router.get('/:organizationId/sales/:saleId', authenticate, verifyOrganization, getSaleDetails);
router.post('/:organizationId/sales/:saleId/void', authenticate, verifyOrganization, voidSale);
router.get('/:organizationId/branches/:branchId/sales/reports/daily', authenticate, verifyOrganization, getDailySalesReport);

export default router;
