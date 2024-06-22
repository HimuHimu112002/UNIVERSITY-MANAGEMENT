import {RequestHandler, Response } from "express";
import {
  createAdminIntoDB,
  createFacultyIntoDB,
  createUser,
  getAllUserService,
  getSingleUserService,
} from "./user.service";
import bcrypt from "bcrypt";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { UserModel } from "./user.model";

const createUserController: RequestHandler = async (req,res,next) => {
  try {
  // let user_role = req.headers.user_role
  // const result = await UserModel.findOne({role: user_role});
  // if(user_role === result){
  //   console.log("done")
  // }
    const { password, student: studentData } = req.body;
    //const {password, user akhen just user dile kaj korena} = req.body;
    bcrypt.hash(password, 10, async function (err, hash) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User information created success",
        data: await createUser(hash, studentData)
      })
    });
    
  }catch (err: any) {
    res.status(500).json({
      success: false,
      message: "fail",
      data: err.message,
    });
  }
};

const getAllUserController: RequestHandler = async (req, res) => {
  try {
    const getallStudent = await getAllUserService();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "user are retrieved successfully",
      data: getallStudent,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
};

const getSingleUserController: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const getallStudent = await getSingleUserService(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "user are retrieved successfully",
      data: getallStudent,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
};

const createFacultyController: RequestHandler = async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  });
};

const createAdmin: RequestHandler = async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
};

export const UserController = {
  createUserController,
  getAllUserController,
  getSingleUserController,
  createFacultyController,
  createAdmin
};
