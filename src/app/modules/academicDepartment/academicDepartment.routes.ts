import express from "express";
import { validateRequest } from "../../middleware/validationRequest";
import { AcademicDepartmentValidationSchema } from "./academicDepartment.validation";
import { createAcademicDepartmentController, getAllAcademicDepartmentController, getSingleAcademicDepartmentController } from "./academicDepartment.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();
router.post(
  "/create-academicDepartment",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(AcademicDepartmentValidationSchema), createAcademicDepartmentController
)

router.get(
  "/getAll-academicDepartment",getAllAcademicDepartmentController
)

router.get(
  "/getSingle-academicDepartment/:id",getSingleAcademicDepartmentController
)
export const AcademicDepartmentRoute= router;