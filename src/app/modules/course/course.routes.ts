import express from 'express';
import { createCourse, deleteCourse, getAllCourses, getSingleCourse, updateCourse } from './course.controller';
import { validateRequest } from '../../middleware/validationRequest';
import { CourseValidations } from './course.validation';


const router = express.Router();

router.post('/create-course', validateRequest(CourseValidations.createCourseValidationSchema),createCourse);

router.get('/getAll-course-query', getAllCourses);
router.get('/getSingle-course/:id', getSingleCourse);
router.patch('/update-course/:id', updateCourse);

// router.delete('/delete-course/:id', deleteCourse);
// router.patch('/update-student/:studentId', updatetudent);

export const CourseRoutes = router;