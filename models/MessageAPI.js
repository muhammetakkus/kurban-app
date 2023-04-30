import mongoose from 'mongoose'

/* Burayı admin panelinden oluşturacak - kullanıcı seçerek bilgilerini girecek */
const MessageAPISchema = new mongoose.Schema({
    message_service_title: String // message service company full name - must be same as the MessageAPI class name
}, {timestamps: true})

export default mongoose.model('MessageAPI', MessageAPISchema)