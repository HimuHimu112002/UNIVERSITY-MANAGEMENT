import express from 'express';
import { assignFacultiesWithCourse, createCourse, deleteCourse, getAllCourses, getSingleCourse, updateCourse } from './course.controller';
import { validateRequest } from '../../middleware/validationRequest';
import { CourseValidations } from './course.validation';

const router = express.Router();

router.post('/create-course', validateRequest(CourseValidations.createCourseValidationSchema),createCourse);

router.get('/getAll-course-query', getAllCourses);
router.get('/getSingle-course/:id', getSingleCourse);
router.patch('/update-course/:id', updateCourse);
router.delete('/delete-course/:id', deleteCourse);

router.put('/create-faculty/:courseId/assign-faculty', assignFacultiesWithCourse);

export const CourseRoutes = router;