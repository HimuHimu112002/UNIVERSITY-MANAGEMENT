import {Schema, model} from 'mongoose'
import { TAcademicFaculty } from './academicFaculty.interface'
const academicFacultySchema = new Schema<TAcademicFaculty>({
    name:{
        type: String,
        require: true
    },
},{timestamps: true, versionKey: false})
export const FacultyModel = model<TAcademicFaculty>('academicFaculty', academicFacultySchema)