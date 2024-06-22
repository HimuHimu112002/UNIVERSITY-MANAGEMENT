import express from 'express';
import {validateRequest} from '../../middleware/validationRequest';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

router.get(
  '/get-single-semester/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);

router.patch(
  '/update-semester/:id',
  validateRequest(
    SemesterRegistrationValidations.upadateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);

router.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);

router.delete(
  '/delete-semester/:id',
  SemesterRegistrationController.deleteSemesterRegistration,
);

router.get('/get-all-semester', SemesterRegistrationController.getAllSemesterRegistrations);

export const semesterRegistrationRoutes = router;