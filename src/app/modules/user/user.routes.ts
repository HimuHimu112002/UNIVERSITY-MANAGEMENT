import express from "express";
import { UserController } from "./user.controller";
import { StudentValidationSchema } from "../student/student.validation";
import { validateRequest } from "../../middleware/validationRequest";
import { createFacultyValidationSchema } from "../facultys/faculty.validation";

const router = express.Router();
router.post(
  "/create-user",
  validateRequest(StudentValidationSchema.studentValidationSchema),
  UserController.createUserController
);

router.post(
  "/create-faculty",
  validateRequest(createFacultyValidationSchema), UserController.createFacultyController);

router.post(
  "/create-admin",UserController.createAdmin);

export const UserRoute = router;
