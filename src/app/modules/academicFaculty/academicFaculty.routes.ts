import express from "express";
import { validateRequest } from "../../middleware/validationRequest";
import { AcademicFacultyValidationSchema } from "./academicFaculty.validation";
import { createAcademicFacultyController, getAcademicFacultyController } from "./academicFaculty.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";


const router = express.Router();
router.post(
  "/create-academicFaculty",
  validateRequest(AcademicFacultyValidationSchema), createAcademicFacultyController
)

router.get(
  "/get-academicFaculty", auth(USER_ROLE.admin, USER_ROLE.faculty) , getAcademicFacultyController
)
export const AcademicFacultyRoute= router;