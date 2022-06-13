import mongoose from 'mongoose'

const MenuSchema = new mongoose.Schema({
    menu_title: String,
    menu_path: String
}, {timestamps: true})

export default mongoose.model('Menu', MenuSchema)