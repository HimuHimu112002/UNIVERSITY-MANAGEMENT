import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartmentyModel } from "./academicDepartment.model";
import { Response } from "express";

export const createAcademicDepartmentDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartmentyModel.create(payload);
  return result;
};

// done
export const getAllAcademicDepartmentService = async () => {
  const result = await AcademicDepartmentyModel.find({}).populate('academicFaculty');
  if(!result){
    throw new AppError(httpStatus.NOT_FOUND,"Data Not Found !")
  }else{
    return result;
  }
};

// done
export const getSingleAcademicDepartmentService = async (id: string) => {
  const result = await AcademicDepartmentyModel.find({_id: id}).populate('academicFaculty');
  if(!result){
    throw new AppError(httpStatus.NOT_FOUND,"Data Not Found !")
  }else{
    return result;
  }
};