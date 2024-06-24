import { Schema, model } from "mongoose";
import { IUserModel, TUser } from "./user.interface";
import bcrypt from "bcrypt";

const userSchema = new Schema<TUser, IUserModel>(
  {
    id: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
      select: 0 // get korle password hide thakbe 
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["admin", "student", "faculty"],
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await UserModel.findOne({ id }).select('+password');
};

// userSchema.statics.isPasswordMatched = async function (
//   plainTextPassword,
//   hashedPassword
// ) {
//   return await bcrypt.compare(plainTextPassword, hashedPassword);
// };

export const UserModel = model<TUser, IUserModel>("User", userSchema);
