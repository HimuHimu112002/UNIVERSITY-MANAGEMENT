import express from "express";
import { validateRequest } from "../../middleware/validationRequest";
import { AcadimicValidation } from "./academic.validation";
import { CreateAcademicSemesterController, getAllAcademicController, getDeleteAcademicController, getSingleAcademicController, getUpdateAcademicController } from "./academic.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

// project router
router.post(
  "/create-academic-semester",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(AcadimicValidation.AcademicValidationSchema), CreateAcademicSemesterController
);

router.get(
  "/get-academic-semester",getAllAcademicController
);

router.get(
  "/getSingle-academic-semester/:id",getSingleAcademicController
);

router.patch(
  "/updateSingle-academic-semester/:id",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(AcadimicValidation.updateAcademicSemesterValidationSchema),getUpdateAcademicController
);

router.delete(
  "/deleteSingle-academic-semester/:id",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),getDeleteAcademicController
);

export const AcademicRoute = router;