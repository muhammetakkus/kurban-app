import mongoose from 'mongoose'

// Kurum hesabı oluşturulduğunda KAYIT-KESİLDİ processlerini otomatik oluştursun
const HisseGroupSchema = new mongoose.Schema({
    kurum_id: mongoose.Types.ObjectId,
    project_id: mongoose.Types.ObjectId,
    hisse_group_title: String,
}, {timestamps: true})

export default mongoose.model('HisseGroup', HisseGroupSchema)