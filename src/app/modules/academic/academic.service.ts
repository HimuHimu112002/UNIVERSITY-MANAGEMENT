import { Error } from "mongoose";
import { TAcademicSemester } from "./academic.interface";
import { AcademicModel } from "./academic.model";
import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";


// done
export const CreateAcademicSemesterServices = async (
  payload: TAcademicSemester ) => {

  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.NOT_FOUND,"Invalid Semester Code");
  }
  const result = await AcademicModel.create(payload);
  return result;
};

// done
export const getAllAcademicService = async () => {
  const result = await AcademicModel.find({});
  if(!result){
    throw new AppError(httpStatus.NOT_FOUND,"Data Not Found !")
  }else{
    return result;
  }
};

// done
export const getSingleAcademicService = async (id: string) => {
  const result = await AcademicModel.findOne({ _id: id });
  if(!result){
    throw new AppError(httpStatus.NOT_FOUND,"Data Not Found Invalid Query !")
  }else{
    return result;
  }
};


// done query from model theke
export const getUpdateAcademicService = async (id: string, payload: Partial<TAcademicSemester>) => {
  const result = await AcademicModel.findOneAndUpdate({ _id: id },{$set:payload},{new:true});
  return result;
};

// done 
export const getDeleteAcademicService = async (id: string) => {
  const result = await AcademicModel.findByIdAndDelete({ _id: id });
  if(!result){
    throw new AppError(httpStatus.NOT_FOUND,"Query Id is Not Found !")
  }else{
    return result;
  }
};
