import express from "express";
import { UserController } from "./user.controller";
import { StudentValidationSchema } from "../student/student.validation";
import { validateRequest } from "../../middleware/validationRequest";

const router = express.Router();
router.post(
  "/create-user",
  validateRequest(StudentValidationSchema.studentValidationSchema),
  UserController.createUserController
);
export const UserRoute = router;
