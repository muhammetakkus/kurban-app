import mongoose from 'mongoose'

const AdminSchema = new mongoose.Schema({
    username: String,
    email: String,
    password : String,
    full_name: String
}, {timestamps: true})

export default mongoose.model('Admin', AdminSchema)