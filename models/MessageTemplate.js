import mongoose from 'mongoose'

const MessageTemplateSchema = new mongoose.Schema({
    message_title: String,
    message_content: String,
    kurum_id: mongoose.Types.ObjectId,
}, {timestamps: true})

export default mongoose.model('MessageTemplate', MessageTemplateSchema)