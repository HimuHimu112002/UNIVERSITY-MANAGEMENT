"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcadimicValidation = void 0;
const zod_1 = require("zod");
// Define the Month type in Zod
const Month = zod_1.z.enum([
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
]);
const AcademicValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.enum(["Autumn", "Summar", "Fall"]),
        code: zod_1.z.enum(["01", "02", "03"]),
        year: zod_1.z.string(),
        startMonth: Month,
        endMonth: Month,
    }),
});
exports.AcadimicValidation = {
    AcademicValidationSchema,
};
