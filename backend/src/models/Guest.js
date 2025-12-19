import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
    name: {type: String, required:true},
    phone: {type:String, required:true, unique:true},
    email: {type:String, required:true, unique:true},
},{timestamps: true, minimize: false})

const Guest = mongoose.models.guest || mongoose.model('guest',guestSchema);
export default Guest;