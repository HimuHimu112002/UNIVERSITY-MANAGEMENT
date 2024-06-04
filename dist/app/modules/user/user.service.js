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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleUserService = exports.getAllUserService = exports.createUser = void 0;
const academic_model_1 = require("../academic/academic.model");
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const createUser = (password, studentData) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {};
    //if password is not given , use deafult password
    userData.password = password || process.env.DEFAULT_PASS;
    //set student role
    userData.role = "student";
    // find academic semester info
    const admissionSemester = yield academic_model_1.AcademicModel.findById(studentData.admissionSemester);
    //set  generated id
    userData.id = yield (0, user_utils_1.generateStudentId)(admissionSemester);
    // create a user
    const newUser = yield user_model_1.UserModel.create(userData);
    //create a student
    if (Object.keys(newUser).length) {
        // set id , _id as user
        studentData.id = newUser.id;
        studentData.user = newUser._id; //reference _id
        const newStudent = yield student_model_1.Student.create(studentData);
        return newStudent;
    }
});
exports.createUser = createUser;
const getAllUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.create({});
    return result;
});
exports.getAllUserService = getAllUserService;
const getSingleUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ _id: id });
    return result;
});
exports.getSingleUserService = getSingleUserService;
