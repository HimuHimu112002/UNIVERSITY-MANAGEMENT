import express from "express";
import {
  assignFacultiesWithCourse,
  createCourse,
  deleteCourse,
  getAllCourses,
  getFacultiesWithCourse,
  getSingleCourse,
  updateCourse,
} from "./course.controller";
import { validateRequest } from "../../middleware/validationRequest";
import { CourseValidations } from "./course.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-course",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(CourseValidations.createCourseValidationSchema),
  createCourse
);
router.patch(
  "/update-course/:id",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  updateCourse
);
router.delete(
  "/delete-course/:id",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  deleteCourse
);
router.put(
  "/create-faculty/:courseId/assign-faculty",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  assignFacultiesWithCourse
);

router.get(
  "/getFaculty/:courseId/getCourseWith-faculty",
  // auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  getFacultiesWithCourse
);

router.get("/getAll-course-query", getAllCourses);
router.get("/getSingle-course/:id", getSingleCourse);
export const CourseRoutes = router;
