"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const createUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, student: studentData } = req.body;
        //const {password, user akhen just user dile kaj korena} = req.body;
        bcrypt_1.default.hash(password, 10, function (err, hash) {
            return __awaiter(this, void 0, void 0, function* () {
                yield (0, user_service_1.createUser)(hash, studentData);
            });
        });
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "User information created success",
            data: false,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "fail",
            data: err.message,
        });
    }
});
const getAllUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getallStudent = yield (0, user_service_1.getAllUserService)();
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "user are retrieved successfully",
            data: getallStudent,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error.message || "Internal server error",
        });
    }
});
const getSingleUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const getallStudent = yield (0, user_service_1.getSingleUserService)(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "user are retrieved successfully",
            data: getallStudent,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error.message || "Internal server error",
        });
    }
});
exports.UserController = {
    createUserController,
    getAllUserController,
    getSingleUserController,
};
