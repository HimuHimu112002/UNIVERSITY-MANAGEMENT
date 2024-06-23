import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Student } from './student.model';
import mongoose, { Error } from 'mongoose';
import { UserModel } from '../user/user.model';
import { TStudent } from './student.interface';

export const getAllStudentsFromDB = async () => {
  const result = await Student
  .find().populate('user').populate('admissionSemester').populate({
    path: 'admissionDepartment',
    populate:{
      path: 'academicFaculty'
    }
  });
  if(result.length == 0){
    throw new AppError(httpStatus.NOT_FOUND,"Data Not Found !")
  }else{
    return result;
  }
};

export const getFilterStudentsFromDB = async (query: Record<string, unknown>) => {

  // filter section
  let searchTerm = '';
  if(query?.searchTerm){
    searchTerm = query?.searchTerm as string;
  }
  const result = await Student.find({
    $or: ['email', 'name.firstName', 'presentAddress'].map((field)=>({
      [field]: {$regex: searchTerm, $options: 'i'}
    }))
  }).populate('admissionSemester').populate({
    path: 'admissionDepartment',
    populate:{
      path: 'academicFaculty'
    }
  });
  if(result.length == 0){
    throw new AppError(httpStatus.NOT_FOUND,"Data Not Found !")
  }else{
    return result;
  }
};

export const getFilterSearchStudentsFromDB = async (query: Record<string, unknown>) => {

  const queryObj = {...query}

  // filter section
  let searchTerm = '';
  if(query?.searchTerm){
    searchTerm = query?.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: ['email', 'name.firstName', 'presentAddress'].map((field)=>({
      [field]: {$regex: searchTerm, $options: 'i'}
    }))
  })

  const excludeFields = ['searchTerm', 'sort', 'limit']
  excludeFields.forEach(el => delete queryObj[el])

  const filterQuery = searchQuery.find(queryObj).populate('admissionSemester').populate({
    path: 'admissionDepartment',
    populate:{
      path: 'academicFaculty'
    }
  });

  // assending and dessending order sort
  let sort = '-createdAt'
  if(query.sort){
    sort = query.sort as string
  }
  const result1 = filterQuery.sort(sort)
  
  // limit query
  let limit = 1
  if(query.limit){
    limit = Number(query.limit)
  }
  const limitQuery = await result1.limit(limit)

  //return result1;
  return limitQuery;
};

export const getPaginateSearchStudentsFromDB = async (query: Record<string, unknown>) => {

  const queryObj = {...query}

  // filter section
  let searchTerm = '';
  if(query?.searchTerm){
    searchTerm = query?.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: ['email', 'name.firstName', 'presentAddress'].map((field)=>({
      [field]: {$regex: searchTerm, $options: 'i'}
    }))
  })

  const excludeFields = ['searchTerm', 'sort', 'limit', 'page']
  excludeFields.forEach(el => delete queryObj[el])

  const filterQuery = searchQuery.find(queryObj).populate('admissionSemester').populate({
    path: 'admissionDepartment',
    populate:{
      path: 'academicFaculty'
    }
  });

  // assending and dessending order sort
  let sort = '-createdAt'
  if(query.sort){
    sort = query.sort as string
  }
  const result1 = filterQuery.sort(sort)
  
  // limit query
  let limit = 1
  let page = 1
  let skip = 0

  if(query.limit){
    limit = Number(query.limit)
  }

  if(query.page){
    page = Number(query.page)
    skip = (page - 1) * limit
  }
  
  const paginateQuery = result1.skip(skip)
  const limitQuery = await paginateQuery.limit(limit)

  //return result1;
  return limitQuery;
};


export const getfieldsSearchStudentsFromDB = async (query: Record<string, unknown>) => {

  const queryObj = {...query}

  // filter section
  let searchTerm = '';
  if(query?.searchTerm){
    searchTerm = query?.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: ['email', 'name.firstName', 'presentAddress'].map((field)=>({
      [field]: {$regex: searchTerm, $options: 'i'}
    }))
  })

  const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']
  excludeFields.forEach(el => delete queryObj[el])

  const filterQuery = searchQuery.find(queryObj).populate('admissionSemester').populate({
    path: 'admissionDepartment',
    populate:{
      path: 'academicFaculty'
    }
  });

  // assending and dessending order sort
  let sort = '-createdAt'
  if(query.sort){
    sort = query.sort as string
  }
  const result1 = filterQuery.sort(sort)
  
  // limit query
  let limit = 1
  let page = 1
  let skip = 0

  if(query.limit){
    limit = Number(query.limit)
  }

  if(query.page){
    page = Number(query.page)
    skip = (page - 1) * limit
  }
  
  const paginateQuery = result1.skip(skip)
  const limitQuery = paginateQuery.limit(limit)


  let fields = '-__v'
  if(query.fields){
    fields = (query.fields as string).split(',').join(' ')
  }

  const fieldQuery = limitQuery.select(fields)
  //return result1;
  return fieldQuery;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.aggregate([{ $match: { id } }]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession()
  try{
    session.startTransaction()
    const result1 = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {new: true, session}
    );
    if(!result1){
      throw new Error('Id Invalid !')
    }
    if(!result1){
      throw new AppError(httpStatus.BAD_REQUEST,'Failed to delete student')
    }
    const result2 = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {new: true, session}
    );
    if(!result2){
      throw new AppError(httpStatus.BAD_REQUEST,'Failed to delete user')
    }
    await session.commitTransaction()
    await session.endSession()
    return result1;
  }catch(err){
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Failed to delete student')
  }
  
};

export const updateStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  const {name, guardian, localGuardian, ...remainingStudentData } = payload

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  }

  if(name && Object.keys(name).length){
    for(const [key, value] of Object.entries(name)){
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  if(guardian && Object.keys(guardian).length){
    for(const [key, value] of Object.entries(guardian)){
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  }

  if(localGuardian && Object.keys(localGuardian).length){
    for(const [key, value] of Object.entries(localGuardian)){
      modifiedUpdateData[`localGuardian.${key}`] = value;
    }
  }
  const result = await Student.findOneAndUpdate({ id },modifiedUpdateData,{new: true, runValidators: true});
  return result;
};

export const StudentServices = {
  getSingleStudentFromDB,
  deleteStudentFromDB,
};