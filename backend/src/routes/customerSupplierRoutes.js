import express from 'express';
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  getCustomerDetails,
  getSuppliers,
  createSupplier,
  updateSupplier,
} from '../controllers/customerSupplierController.js';
import { authenticate, verifyOrganization } from '../middleware/auth.js';

const router = express.Router();

// Customer routes
router.get('/:organizationId/customers', authenticate, verifyOrganization, getCustomers);
router.post('/:organizationId/customers', authenticate, verifyOrganization, createCustomer);
router.put('/:organizationId/customers/:customerId', authenticate, verifyOrganization, updateCustomer);
router.get('/:organizationId/customers/:customerId', authenticate, verifyOrganization, getCustomerDetails);

// Supplier routes
router.get('/:organizationId/suppliers', authenticate, verifyOrganization, getSuppliers);
router.post('/:organizationId/suppliers', authenticate, verifyOrganization, createSupplier);
router.put('/:organizationId/suppliers/:supplierId', authenticate, verifyOrganization, updateSupplier);

export default router;
