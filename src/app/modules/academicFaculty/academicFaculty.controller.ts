import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { createAcademicFacultyDB } from "./academicFaculty.service";
import { catchAsync } from "../../utils/catchAsync";

export const createAcademicFacultyController = catchAsync(
  async (req, res) => {
    const result = await createAcademicFacultyDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic Faculty Created Success",
      data: result,
    });
  }
);
