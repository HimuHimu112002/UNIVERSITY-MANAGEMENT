import { NextFunction, Request, RequestHandler, Response } from "express";

export const catchAsync = (fn: RequestHandler) => {
  // catchAsync er maddhome fn getSingleStudent function ti recived kortese then fn function promise.resolve er akhane req,res,next and err catch kortese then return kortese se jonno try catch lagbena
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};
