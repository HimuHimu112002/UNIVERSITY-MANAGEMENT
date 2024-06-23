import express from 'express';
import { StudentControllers, deleteStudent, getAllStudents, getFieldsStudents, getFilterStudents, getPaginationStudents, getSearchingStudents, updatetudent } from './student.controller';


const router = express.Router();

router.get('/getAll-student', getAllStudents);
router.get('/getFilter-student', getFilterStudents);
router.get('/getFilterLimitSearch-student', getSearchingStudents);
router.get('/getPaginateSearch-student', getPaginationStudents);
router.get('/getFieldsSearch-student', getFieldsStudents);

router.get('/get-single-studentId/:id', StudentControllers.getSingleStudent);
router.delete('/delete-student/:studentId', deleteStudent);
router.delete('/delete-student/:studentId', deleteStudent);
router.patch('/update-student/:studentId', updatetudent);

export const StudentRoutes = router;