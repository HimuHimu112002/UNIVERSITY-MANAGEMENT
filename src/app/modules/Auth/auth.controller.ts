import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import { Request, Response } from "express";
import { UserModel } from "../user/user.model";

const loginUser = async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);
  //const { accessToken, needsPasswordChange } = result;

  //   res.cookie('refreshToken', refreshToken, {
  //     secure: config.NODE_ENV === 'production',
  //     httpOnly: true,
  //   });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in succesfully!",
    data: {
      //accessToken,
      //   needsPasswordChange,
      result,
    },
  });
};

const changePassword = async (req: Request, res: Response) => {
  const { ...passwordData } = req.body;
  //const result = await AuthServices.changePassword(, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password is updated succesfully!",
    data: null,
  });
};

// const refreshToken = async (req: Request, res: Response) => {
//   const { refreshToken } = req.cookies;
//   const result = await AuthServices.refreshToken(refreshToken);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Access token is retrieved succesfully!",
//     data: result,
//   });
// };

export const AuthControllers = {
  loginUser,
  changePassword,
  //refreshToken,
};
