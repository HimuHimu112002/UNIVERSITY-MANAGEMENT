"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const student_validation_1 = require("../student/student.validation");
const validationRequest_1 = require("../../middleware/validationRequest");
const router = express_1.default.Router();
// project router
router.post("/create-user", (0, validationRequest_1.validateRequest)(student_validation_1.StudentValidationSchema.studentValidationSchema), user_controller_1.UserController.createUserController);
exports.UserRoute = router;
