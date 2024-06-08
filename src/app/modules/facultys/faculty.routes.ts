import express from 'express';
import {validateRequest} from '../../middleware/validationRequest';
import { updateFacultyValidationSchema } from './faculty.validation';
import { deleteFaculty, getAllFaculty, getSingleFaculty, updateFaculty } from './faculty.controller';

const router = express.Router();

router.get('/get-singleFaculty/:id', getSingleFaculty);

router.patch('/update-faculty/:id',validateRequest(updateFacultyValidationSchema),updateFaculty);

router.delete('/delete-faculty/:id',deleteFaculty);

router.get('/',getAllFaculty);

export const FacultyRoutes = router;