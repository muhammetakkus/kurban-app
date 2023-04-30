import mongoose from 'mongoose'
// Satılan Hisse Kaydı - Hissedar Collection -Relations to- Kurban Collection
const HisseSchema = new mongoose.Schema({
    //hissedar_id: mongoose.Types.ObjectId,
    kurum_id: mongoose.Types.ObjectId,
    project_id: mongoose.Types.ObjectId,
    kurban_id: mongoose.Types.ObjectId,
    hissedar_full_name: String,
    hissedar_gsm: Number,
    kapora: Number,
    referans_full_name: String, // Hissedarlar sayfasında görünecek referans
    referans_gsm: Number,
    hissedar_note: String,
    is_vekalet: {
        type: Boolean,
        default: 0
    },
    // hissedar collection'ında varsa direk burada id si olacak. Yoksa önce hissedar collention'a hissedar kaydı sonra burada kurban satılmış kaydı ?
}, {timestamps: true})

export default mongoose.model('Hisse', HisseSchema)