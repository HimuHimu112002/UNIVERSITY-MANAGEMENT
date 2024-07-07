import express from "express";
import { validateRequest } from "../../middleware/validationRequest";
import { OfferedCourseControllers } from "./OfferedCourse.controller";
import { OfferedCourseValidations } from "./OfferedCourse.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-offered-course",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse
);

router.patch(
  "/update-offerCourse/:id",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse
);

router.delete(
  "/delete-offerCourse/:id",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  OfferedCourseControllers.deleteOfferedCourseFromDB
);

router.get(
  "/get-all-offerCourse",
  OfferedCourseControllers.getAllOfferedCourses
);

router.get(
  "/get-single-offerCourse/:id",
  OfferedCourseControllers.getSingleOfferedCourses
);

export const offeredCourseRoutes = router;
