import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validateRequest = (validSchema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try{
      await validSchema.parseAsync({
        body: req.body, // validation body theke data guli recived korbe akhane body: req.body dile zod validation body use kortye hobe r jodi akhane body use na kori tahole zod body use korte hobena data send hobe
      });
      next();
    }catch(err){
      next(err)
    }
  };
};
