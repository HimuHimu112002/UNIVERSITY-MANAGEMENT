import express from 'express';
import {validateRequest} from '../../middleware/validationRequest';
import { AdminControllers } from './admin.controller';
import { updateAdminValidationSchema } from './admin.validation';

const router = express.Router();

router.get('/get-all-admin', AdminControllers.getAllAdmins);

router.get('/get-single-admin/:id', AdminControllers.getSingleAdmin);

router.patch(
  '/get-update-admin/:id',
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/delete-admin/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;