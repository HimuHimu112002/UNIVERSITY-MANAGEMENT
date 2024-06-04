"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
const catchAsync = (fn) => {
    // catchAsync er maddhome fn getSingleStudent function ti recived kortese then fn function promise.resolve er akhane req,res,next and err catch kortese then return kortese se jonno try catch lagbena
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
};
exports.catchAsync = catchAsync;
