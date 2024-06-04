import { TAcademicFaculty } from "./academicFaculty.interface";
import { FacultyModel } from "./academicFaculty.model";

export const createAcademicFacultyDB = async (payload: TAcademicFaculty) => {
  const result = await FacultyModel.create(payload);
  return result;
};