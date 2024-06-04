"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicRoute = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = require("../../middleware/validationRequest");
const academic_validation_1 = require("./academic.validation");
const academic_controller_1 = require("./academic.controller");
const router = express_1.default.Router();
// project router
router.post("/create-academic-semester", (0, validationRequest_1.validateRequest)(academic_validation_1.AcadimicValidation.AcademicValidationSchema), academic_controller_1.CreateAcademicSemesterController);
exports.AcademicRoute = router;
