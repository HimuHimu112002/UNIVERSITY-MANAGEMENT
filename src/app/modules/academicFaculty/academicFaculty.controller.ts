import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import {
  createAcademicFacultyDB,
} from "./academicFaculty.service";
import { Request, Response } from "express";
import { FacultyModel } from "./academicFaculty.model";

export const createAcademicFacultyController = async (
  req: Request,
  res: Response
) => {
  const result = await createAcademicFacultyDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Faculty Created Success",
    data: result,
  });
};

export const getAcademicFacultyController = async (req: Request, res: Response) => {
  const result = await FacultyModel.find();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Faculty get Success",
    data: result,
  });
};
