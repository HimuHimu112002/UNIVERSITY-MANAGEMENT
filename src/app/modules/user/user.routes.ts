import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import { StudentValidationSchema } from "../student/student.validation";
import { validateRequest } from "../../middleware/validationRequest";
import { createFacultyValidationSchema } from "../facultys/faculty.validation";
import { USER_ROLE } from "./user.constant";
import auth from "../../middleware/auth";
import { userValidation } from "./user.validation";
import { upload } from "../../utils/sendImageCloudinary";
const router = express.Router();

router.post(
  "/create-user",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(StudentValidationSchema.studentValidationSchema),
  UserController.createUserController
);

router.post(
  "/create-faculty",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin), 
  validateRequest(createFacultyValidationSchema), UserController.createFacultyController);

router.post("/create-admin",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  UserController.createAdmin);


router.post("/me",
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  UserController.getMe);


  router.post(
    '/change-status/:id',
    auth('admin'),
    validateRequest(userValidation.changeStatusValidationSchema),
    UserController.changeStatus,
  );
  
export const UserRoute = router;
