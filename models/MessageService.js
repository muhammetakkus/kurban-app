import mongoose from 'mongoose'

// Burayı kullanıcı panelinden oluşturacak
const MessageServiceSchema = new mongoose.Schema({
    message_service_origin: String, 
    message_service_username: String,
    message_service_password: String, 
    kurum_id: mongoose.Types.ObjectId,
    message_api_title: String,
    message_api: {
        type: mongoose.Types.ObjectId,
        ref: "MessageAPI"
    },
    kurum_id: {
        type: mongoose.Types.ObjectId,
        ref: "Kurum"
    }
}, {timestamps: true})

export default mongoose.model('MessageService', MessageServiceSchema)