import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser{
  id: String;
  email: String;
  password: String;
  needsPasswordChange: boolean;
  role: "superAdmin" | "admin" | "student" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
};

export interface IUserModel extends Model<TUser> {

  //instance methods for checking if the user exist
  isUserExistsByCustomId(id: string): Promise<TUser>;


  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;

}
export type TUserRole = keyof typeof USER_ROLE;