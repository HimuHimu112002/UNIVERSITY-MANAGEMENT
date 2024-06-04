import express from "express";
import { validateRequest } from "../../middleware/validationRequest";
import { AcadimicValidation } from "./academic.validation";
import { CreateAcademicSemesterController, getAllAcademicController, getDeleteAcademicController, getSingleAcademicController, getUpdateAcademicController } from "./academic.controller";

const router = express.Router();

// project router
router.post(
  "/create-academic-semester",
  validateRequest(AcadimicValidation.AcademicValidationSchema), CreateAcademicSemesterController
);

router.get(
  "/get-academic-semester",getAllAcademicController
);

router.get(
  "/getSingle-academic-semester/:id",getSingleAcademicController
);

router.patch(
  "/updateSingle-academic-semester/:id",validateRequest(AcadimicValidation.updateAcademicSemesterValidationSchema),getUpdateAcademicController
);

router.delete(
  "/deleteSingle-academic-semester/:id",getDeleteAcademicController
);

export const AcademicRoute = router;