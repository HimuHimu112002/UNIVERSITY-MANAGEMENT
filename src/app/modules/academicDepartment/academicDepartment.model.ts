import {Error, Schema, model} from 'mongoose'
import { TAcademicDepartment } from './academicDepartment.interface'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name:{
        type: String,
        require: true,
        unique: true    
    },
    academicFaculty:{
        type: Schema.Types.ObjectId,
        ref: 'academicFaculty'
    },
},{timestamps: true, versionKey: false})

academicDepartmentSchema.pre('save', async function(next) {
    const isDepartmentExist = await AcademicDepartmentyModel.findOne({name: this.name})
    if(isDepartmentExist){
        throw new Error('This department is already exist !')
    }
    next()
})
export const AcademicDepartmentyModel = model<TAcademicDepartment>('academicDepartment', academicDepartmentSchema)