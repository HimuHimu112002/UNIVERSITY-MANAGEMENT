import { TAcademicSemester } from "../academic/academic.interface";
import { UserModel } from "./user.model";

const findLastStudentId = async () => {
  const lastStudent = await UserModel.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    }
  )
  .sort({
    createdAt: -1,
    // createdAt -1 er maddhome last push houya student er info find kore anbe r jodi semester change hoiye jai thaole new vabe set korbe 0001
  })
  .lean();
  // .lean() use korte hoi tokhon jokhon lean er pore r kono moongose operation kora hobena lean use korle query fast hoi
  return lastStudent?.id ? lastStudent.id : undefined;
  // jodi lastStudent?.id thake tahole lastStudent.id diye dibe r jodi kono id na thake new semester create kora hoiyece tahole undefined diye dibe function call hobena 
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  let  currentId = (0).toString(); // 0000 by deafult 
  //2024010001
  const lastStudentId = await findLastStudentId()
  const lastStudentSemesterId = lastStudentId?.substring(4,6) // 01
  const lastStudentYear = lastStudentId?.substring(0,4) // 2030
  const currentSemesterCode = payload.code;
  const currentSemesterYear = payload.year;

  if(lastStudentId && lastStudentSemesterId === currentSemesterCode && lastStudentYear === currentSemesterYear){
    currentId = lastStudentId.substring(6) // 00001
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  //padStart mane holo 4 ta zero bosbe

  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};

// Faculty ID
export const findLastFacultyId = async () => {
  const lastFaculty = await UserModel.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `F-${incrementId}`;

  return incrementId;
};

// Admin ID
export const findLastAdminId = async () => {
  const lastAdmin = await UserModel.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;
  return incrementId;
};