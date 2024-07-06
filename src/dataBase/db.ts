import mongoose  from 'mongoose'

function DatabaseConnection() {
    mongoose.connect(`mongodb+srv://phManage:UKZMb18A7ruql36a@cluster0.o72kxch.mongodb.net/ph-university?retryWrites=true&w=majority`).then(() =>{
        console.log("Database Connection Complete")
    }).catch((error: { message: any; }) =>{
        console.error('Error connecting to MongoDB:', error.message);
    });;
}
export default DatabaseConnection;