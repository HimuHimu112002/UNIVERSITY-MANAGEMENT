import express from 'express';
import { StudentControllers, deleteStudent, getAllStudents, updatetudent } from './student.controller';

const router = express.Router();

router.get('/getAll-student', getAllStudents);
router.get('/get-single-studentId/:id', StudentControllers.getSingleStudent);
router.delete('/delete-student/:studentId', deleteStudent);
router.delete('/delete-student/:studentId', deleteStudent);
router.patch('/update-student/:studentId', updatetudent);

export const StudentRoutes = router;