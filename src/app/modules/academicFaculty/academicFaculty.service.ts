import { Request, Response } from "express";
import { TAcademicFaculty } from "./academicFaculty.interface";
import { FacultyModel } from "./academicFaculty.model";

export const createAcademicFacultyDB = async (payload: TAcademicFaculty) => {
  const result = await FacultyModel.create(payload);
  return result;
};

// export const getAcademicFacultyDB = async (req:Request, res: Response) => {
//   let user_id = req.headers.user_id
//   const result = await FacultyModel.find({id: user_id});
//   return result;
// };