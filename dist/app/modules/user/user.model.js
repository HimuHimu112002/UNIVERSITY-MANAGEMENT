"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    needsPasswordChange: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['admin', 'student', 'faculty']
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress'
    },
    isActive: {
        type: Boolean,
        default: false
    },
}, { timestamps: true, versionKey: false });
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
