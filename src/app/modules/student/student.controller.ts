import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { StudentServices, getAllStudentsFromDB, getFilterSearchStudentsFromDB, getFilterStudentsFromDB, updateStudentFromDB } from "./student.service";
import { catchAsync } from "../../utils/catchAsync";
import { Request, Response } from "express";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";

const getSingleStudent = catchAsync(async (req,res) => {

  const { id } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is retrieved succesfully",
    data: result,
  });
})

export const getAllStudents = async (req: Request, res: Response) => {
  try{
    const result = await getAllStudentsFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student data find success !",
      data: result,
    });
  }catch(err: any){
    return res.status(400).json({
      success: false,
      message: err.message,
      error: err,
    })
  }
};

export const getFilterStudents = async (req: Request, res: Response) => {
  try{
    const result = await getFilterStudentsFromDB(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student data filtering success !",
      data: result,
    });
  }catch(err: any){
    return res.status(400).json({
      success: false,
      message: err.message,
      error: err,
    })
  }
};

export const getSearchingStudents = async (req: Request, res: Response) => {
  try{
    const result1 = await getFilterSearchStudentsFromDB(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student data filtering success !",
      data: result1,
    });
  }catch(err: any){
    return res.status(400).json({
      success: false,
      message: err.message,
      error: err,
    })
  }
};

export const deleteStudent = async (req: Request, res: Response) => {

  try{
    const { studentId } = req.params;
    const resultId = await Student.findOne({studentId})
    if(!resultId){
      throw new AppError(httpStatus.BAD_REQUEST,"This student id is invalid !")
    }
    const result = await StudentServices.deleteStudentFromDB(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is deleted succesfully",
      data: result,
    });
  }catch(err: any){
    return res.status(400).json({
      success: false,
      message: err.message,
      error: err,
    })
  }
  
};

export const updatetudent = async (req: Request, res: Response) => {
  try{
    const { studentId } = req.params;
    const {student} = req.body
    const result = await updateStudentFromDB(studentId, student);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is updated succesfull",
      data: result,
    });
  }catch(err: any){
    return res.status(400).json({
      success: false,
      message: err.message,
      error: err,
    })
  }
  
};

export const StudentControllers = {
  getSingleStudent,
};
