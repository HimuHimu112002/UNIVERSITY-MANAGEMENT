import express from "express";
import { UserController } from "./user.controller";
import { StudentValidationSchema } from "../student/student.validation";
import { validateRequest } from "../../middleware/validationRequest";
import { createFacultyValidationSchema } from "../facultys/faculty.validation";
import { USER_ROLE } from "./user.constant";
import auth from "../../middleware/auth";
const router = express.Router();
router.post(
  "/create-user",
  auth(USER_ROLE.student),
  validateRequest(StudentValidationSchema.studentValidationSchema),
  UserController.createUserController
);

router.post(
  "/create-faculty",
  auth(USER_ROLE.admin), 
  validateRequest(createFacultyValidationSchema), UserController.createFacultyController);

router.post("/create-admin",
  //auth(USER_ROLE.admin),
  UserController.createAdmin);
export const UserRoute = router;
