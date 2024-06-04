import {Schema, model} from 'mongoose'
import { TUser } from './user.interface'

const userSchema = new Schema<TUser>({
    id:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    needsPasswordChange:{
        type: Boolean,
        default: true
    },
    role:{
        type: String,
        enum: ['admin', 'student', 'faculty']
    },
    status:{
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress'
    },
    isActive:{
        type: Boolean,
        default: false
    },
},{timestamps: true, versionKey: false})

export const UserModel = model<TUser>('User', userSchema)