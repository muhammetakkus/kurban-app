import mongoose from 'mongoose'

const MessageServiceSchema = new mongoose.Schema({
    message_service_title: String, // message service company
    message_service_username: String, // message_service signIn username
    message_service_password: String, 
    message_service_orginator: String, // mesaj başlığı
    is_default: {
        type: Boolean,
        default: 0
    },
    kurum_id: mongoose.Types.ObjectId,
}, {timestamps: true})

export default mongoose.model('MessageService', MessageServiceSchema)