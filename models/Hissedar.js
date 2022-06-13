import mongoose from 'mongoose'

const HissedarSchema = new mongoose.Schema({
    hissedar_full_name: String,
    hissedar_address: String,
    hissedar_gsm: String,
    referans_full_name: String, // Hissedarlar sayfasında görünecek referans
    referans_gsm: String,
    kurum_id: mongoose.Types.ObjectId,
}, {timestamps: true})

export default mongoose.model('Hissedar', HissedarSchema)