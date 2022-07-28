import mongoose from 'mongoose'

// Kurum hesabı oluşturulduğunda KAYIT-KESİLDİ processlerini otomatik oluştursun
const ProcessSchema = new mongoose.Schema({
    kurum_id: mongoose.Types.ObjectId,
    process_title: String,
    process_order: Number,
    /*message_template: {
        type: String,
        default: null
    },*/
    message_template: {
        type: mongoose.Types.ObjectId,
        ref: "MessageTemplate"
    },
}, {timestamps: true})

export default mongoose.model('Process', ProcessSchema)