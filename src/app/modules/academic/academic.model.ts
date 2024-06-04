import { Error, Schema, model } from "mongoose";
import { TAcademicSemester } from "./academic.interface";
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from "./academicSemester.constant";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const AcademicSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      require: true,
      enum: AcademicSemesterName,
    },
    code: {
      type: String,
      require: true,
      enum: AcademicSemesterCode,
    },
    year: {
      type: String,
      require: true,
    },
    startMonth: {
      type: String,
      enum: Months,
    },
    endMonth: {
      type: String,
      enum: Months,
    },
  },
  { timestamps: true, versionKey: false }
);

// same semester name and same semester year use kore data save kora jabena
AcademicSchema.pre("save", async function(next) {
  const isSemesterExists = await AcademicModel.findOne({
    year: this.year,
    name: this.name,
  });

  if (isSemesterExists) {
    throw new Error("Semester is already exists !");
  }
  next();
});

AcademicSchema.pre('findOneAndUpdate', async function(next) {
  const query = this.getQuery()
  const resultError = await AcademicModel.findOne(query)
  if(!resultError){
    throw new AppError(httpStatus.NOT_FOUND,'This id query are invalid !')
  }
  next()
})

export const AcademicModel = model<TAcademicSemester>(
  "academicSemester",
  AcademicSchema
);
