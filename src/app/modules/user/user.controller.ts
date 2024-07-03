import {RequestHandler, Response } from "express";
import {
  changeStatusService,
  createAdminIntoDB,
  createFacultyIntoDB,
  createUser,
  getAllUserService,
  getSingleUserService,
  personalgetMe,
} from "./user.service";
import bcrypt from "bcrypt";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createUserController: RequestHandler = async (req, res, next) => {
  const { password, student: studentData } = req.body;
  // const result = await createUser(
  //   password,
  //   studentData,
  // );
  bcrypt.hash(password, 10, async function (err, hash) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student information created success",
      data: await createUser(
        hash,
        studentData,
      )
    });
  });

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

  //const result = await createFacultyIntoDB(password, facultyData);
  bcrypt.hash(password, 10, async function (err, hash) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Faculty is created succesfully",
      data: await createFacultyIntoDB(
        hash,
        facultyData,
      )
    });
  });
};

const createAdmin: RequestHandler = async (req, res) => {
  try {
    const { password, admin: adminData } = req.body;
    bcrypt.hash(password, 10, async function (err, hash) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin information created success",
        data: await createAdminIntoDB(hash, adminData),
      });
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "fail",
      data: err.message,
    });
  }
};

const getMe = async (req: Request, res: Response) => {

  const { userId, role } = req.user;

  const result = await personalgetMe(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
  });
};


const changeStatus = async (req: any, res: any) => {
  const id = req.params.id;

  const result = await changeStatusService(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated succesfully',
    data: result,
  });
};

export const UserController = {
  createUserController,
  getAllUserController,
  getSingleUserController,
  createFacultyController,
  createAdmin,
  getMe,
  changeStatus
};
