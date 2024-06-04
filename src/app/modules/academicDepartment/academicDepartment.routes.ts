import express from "express";
import { validateRequest } from "../../middleware/validationRequest";
import { AcademicDepartmentValidationSchema } from "./academicDepartment.validation";
import { createAcademicDepartmentController, getAllAcademicDepartmentController, getSingleAcademicDepartmentController } from "./academicDepartment.controller";

const router = express.Router();
router.post(
  "/create-academicDepartment",
  validateRequest(AcademicDepartmentValidationSchema), createAcademicDepartmentController
)

router.get(
  "/getAll-academicDepartment",getAllAcademicDepartmentController
)

router.get(
  "/getSingle-academicDepartment/:id",getSingleAcademicDepartmentController
)
export const AcademicDepartmentRoute= router;