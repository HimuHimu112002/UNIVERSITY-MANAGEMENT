import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { createAcademicDepartmentDB, getAllAcademicDepartmentService, getSingleAcademicDepartmentService } from "./academicDepartment.service";
import { Request, Response } from "express";
import { AcademicDepartmentyModel } from "./academicDepartment.model";

export const createAcademicDepartmentController = catchAsync(
  async (req, res, next) => {
    const result = await createAcademicDepartmentDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Department Created Success",
      data: result,
    });
  }
);

export const getAllAcademicDepartmentController = async (req: Request, res: Response) => {
  try {
    const getallDepartment = await getAllAcademicDepartmentService();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Department All Data Read Successfully",
      data: getallDepartment
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};


export const getSingleAcademicDepartmentController = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    const getallDepartment = await getSingleAcademicDepartmentService(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Department All Data Read Successfully",
      data: getallDepartment
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};