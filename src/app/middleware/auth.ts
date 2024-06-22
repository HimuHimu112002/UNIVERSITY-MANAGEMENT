import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/user/user.interface";
import { DecodeUserToken } from "../modules/Auth/auth.utils";
import { JwtPayload } from "jsonwebtoken";

const auth = (...requiredRoles: TUserRole[]) => {

 

  return async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers["token"];
    if (!token) {
      if (req.cookies && req.cookies["token"]) {
        token = req.cookies["token"];
      }
    }


    let decoded = DecodeUserToken(token as string);

    // const role  = (decoded as JwtPayload).role
    // if(requiredRoles && !requiredRoles.includes(role)){
    //   return res.status(401).json({ status: "fail", message: "Role Unauthorized" });
    // }

    if (decoded === null) {
      return res.status(401).json({ status: "fail", message: "Unauthorized" });
    } else {
      let userId = decoded.id;
      let user_role = decoded.role;
      req.headers.userId = userId;
      req.headers.user_role = user_role;
      next();
    }
  };
};

export default auth;
