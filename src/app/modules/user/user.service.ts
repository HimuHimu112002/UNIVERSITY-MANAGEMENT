import mongoose, { Error } from "mongoose";
import { AcademicModel } from "../academic/academic.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

export const createUser = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (process.env.DEFAULT_PASS as string);
  userData.role = "student";

  const admissionSemester = await AcademicModel.findById(
    payload.admissionSemester
  );
  //set  generated id
  userData.id = await generateStudentId(admissionSemester);

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], {session});

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user")
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    //(transaction-2)
    const newStudent = await Student.create([payload], {session});
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student")
    }

    await session.commitTransaction() // end of tranjection
    await session.endSession()

    return newStudent;
  }catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Failed to create student information !')
  }
};

export const getAllUserService = async () => {
  const result = await UserModel.find({});
  return result;
};

export const getSingleUserService = async (id: string) => {
  const result = await UserModel.findOne({ _id: id });
  return result;
};
