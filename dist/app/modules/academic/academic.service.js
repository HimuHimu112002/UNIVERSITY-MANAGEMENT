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
exports.CreateAcademicSemesterServices = void 0;
const mongoose_1 = require("mongoose");
const academic_model_1 = require("./academic.model");
const CreateAcademicSemesterServices = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemesterNameCodeMappnig = {
        Autumn: '01',
        Summar: '02',
        Fall: '03'
    };
    // akhdne  Fall ase 03 jodi amra client theke Fall 
    if (academicSemesterNameCodeMappnig[payload.name] !== payload.code) {
        throw new mongoose_1.Error('Invalid semester code');
    }
    const result = yield academic_model_1.AcademicModel.create(payload);
    return result;
});
exports.CreateAcademicSemesterServices = CreateAcademicSemesterServices;
