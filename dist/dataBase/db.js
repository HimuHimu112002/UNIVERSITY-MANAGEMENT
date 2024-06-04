"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function DatabaseConnection() {
    mongoose_1.default.connect(`mongodb+srv://phManage:UKZMb18A7ruql36a@cluster0.o72kxch.mongodb.net/phManage?retryWrites=true&w=majority`).then(() => {
        console.log("Database Connection Complete");
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });
    ;
}
exports.default = DatabaseConnection;
