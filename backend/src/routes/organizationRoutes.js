import express from 'express';
import {
  getOrganization,
  updateOrganizationSettings,
  getOrganizationUsers,
  inviteUser,
  updateUserRole,
  deactivateUser,
  getOrganizationBranches,
  createBranch,
  updateBranch,
} from '../controllers/organizationController.js';
import { authenticate, authorize, verifyOrganization } from '../middleware/auth.js';

const router = express.Router();

// Organization routes
router.get('/:organizationId', authenticate, verifyOrganization, getOrganization);
router.put('/:organizationId/settings', authenticate, verifyOrganization, updateOrganizationSettings);

// User management routes
router.get('/:organizationId/users', authenticate, verifyOrganization, getOrganizationUsers);
router.post('/:organizationId/users/invite', authenticate, verifyOrganization, inviteUser);
router.put('/:organizationId/users/:userId/role', authenticate, verifyOrganization, updateUserRole);
router.put('/:organizationId/users/:userId/deactivate', authenticate, verifyOrganization, deactivateUser);

// Branch management routes
router.get('/:organizationId/branches', authenticate, verifyOrganization, getOrganizationBranches);
router.post('/:organizationId/branches', authenticate, verifyOrganization, createBranch);
router.put('/:organizationId/branches/:branchId', authenticate, verifyOrganization, updateBranch);

export default router;
