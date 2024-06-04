import express from "express";
import { validateRequest } from "../../middleware/validationRequest";
import { AcademicFacultyValidationSchema } from "./academicFaculty.validation";
import { createAcademicFacultyController } from "./academicFaculty.controller";

const router = express.Router();
router.post(
  "/create-academicFaculty",
  validateRequest(AcademicFacultyValidationSchema), createAcademicFacultyController
)
export const AcademicFacultyRoute= router;