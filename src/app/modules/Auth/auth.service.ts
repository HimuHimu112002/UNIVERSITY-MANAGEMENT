import bcrypt from "bcrypt";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { EncodeUserToken } from "./auth.utils";
import { JwtPayload } from "jsonwebtoken";
import { any } from "zod";
import { Request } from "express";

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await UserModel.isUserExistsByCustomId(payload.id);

  // get korar time model theke pass sequre kora hoiyese select 0 diye se jonno akhon select korte holo pass ke
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  // checking if the user is blocked
  const userStatus = user?.status;
  if (userStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
  }

  //checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password as string
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched!");
  }

  // //create token and sent to the  client
  // const token = EncodeUserToken(user.id, user.role);
  // return {
  //   token,
  //   needsPasswordChange: user?.needsPasswordChange,
  // };
};

const changePassword = async (
  req: Request,
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string; TUser: string }
) => {
  // checking if the user is exist
  //const user = await UserModel.isUserExistsByCustomId(userData.userId)
  // if (!user) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  // }
  // checking if the user is already deleted
  //const isDeleted = user?.isDeleted;
  // if (isDeleted) {
  //   throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  // }
  // checking if the user is blocked
  // const userStatus = user?.status;
  // if (userStatus === 'blocked') {
  //   throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  // }
  //checking if the password is correct
  // if (!(await UserModel.isPasswordMatched(payload.oldPassword, user?.password)))
  //   throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  // //hash new password
  // const newHashedPassword = await bcrypt.hash(
  //   payload.newPassword,
  //   Number(config.bcrypt_salt_rounds),
  // );
  // await UserModel.findOneAndUpdate(
  //   {
  //     id: userData.userId,
  //     role: userData.role,
  //   },
  //   {
  //     password: newHashedPassword,
  //     needsPasswordChange: false,
  //     passwordChangedAt: new Date(),
  //   },
  // );
  // return null;
};

// const refreshToken = async (token: string) => {
//   // checking if the given token is valid
//   const decoded = jwt.verify(
//     token,
//     config.jwt_refresh_secret as string,
//   ) as JwtPayload;

//   const { userId, iat } = decoded;

//   // checking if the user is exist
//   const user = await UserModel.isUserExistsByCustomId(userId);

//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
//   }
//   // checking if the user is already deleted
//   const isDeleted = user?.isDeleted;

//   if (isDeleted) {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
//   }

//   // checking if the user is blocked
//   const userStatus = user?.status;

//   if (userStatus === 'blocked') {
//     throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
//   }

//   if (
//     user.passwordChangedAt &&
//     UserModel.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
//   ) {
//     throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
//   }

//   const jwtPayload = {
//     userId: user.id,
//     role: user.role,
//   };

//   const accessToken = createToken(
//     jwtPayload,
//     config.jwt_access_secret as string,
//     config.jwt_access_expires_in as string,
//   );

//   return {
//     accessToken,
//   };
// };

export const AuthServices = {
  loginUser,
  changePassword,
  //refreshToken,
};
