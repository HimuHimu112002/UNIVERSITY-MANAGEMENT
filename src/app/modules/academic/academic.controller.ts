import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import {
  CreateAcademicSemesterServices,
  getAllAcademicService,
  getDeleteAcademicService,
  getSingleAcademicService,
  getUpdateAcademicService,
} from "./academic.service";
import { Request, Response } from "express";

export const CreateAcademicSemesterController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await CreateAcademicSemesterServices(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Semester is created succesfully",
      data: result,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

export const getAllAcademicController = async (req: Request, res: Response) => {
  try {
    const getallStudent = await getAllAcademicService();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic All Data Read Successfully",
      data: getallStudent,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

export const getSingleAcademicController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const getallStudent = await getSingleAcademicService(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Single Data Read Successfully",
      data: getallStudent,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

export const getUpdateAcademicController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const getallStudent = await getUpdateAcademicService(id, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Single Data Update Successfully",
      data: getallStudent,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};

export const getDeleteAcademicController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const getallStudent = await getDeleteAcademicService(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Single Data Deleted Successfully",
      data: getallStudent,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.message,
      error: err,
    });
  }
};
