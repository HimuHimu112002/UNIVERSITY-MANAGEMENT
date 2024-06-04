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
exports.AcademicModel = void 0;
const mongoose_1 = require("mongoose");
const AcademicSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true,
    },
    code: {
        type: String,
        require: true,
    },
    year: {
        type: String,
        require: true
    },
    startMonth: {
        type: String,
        enum: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
    },
    endMonth: {
        type: String,
        enum: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
    },
}, { timestamps: true, versionKey: false });
// same semester name and same semester year use kore data save kora jabena
AcademicSchema.pre('save', function name(next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isSemesterExists = yield exports.AcademicModel.findOne({
            year: this.year,
            name: this.name
        });
        if (isSemesterExists) {
            throw new mongoose_1.Error('Semester is already exists !');
        }
        next();
    });
});
exports.AcademicModel = (0, mongoose_1.model)("Academic", AcademicSchema);
