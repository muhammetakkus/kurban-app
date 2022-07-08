import mongoose from 'mongoose'

const BuyukbasSchema = new mongoose.Schema({
    kurum_id: mongoose.Types.ObjectId,
    project_id: mongoose.Types.ObjectId,
    kurban_no: Number,
    kurban_kupe_no: String,
    kurban_hisse_group: String,
    net_hisse_fiyat: Number,
    uniq_kurban_code: String,
    kurban_image: String,
    kurban_image_key: String,
    kurban_weight: String,
    kurban_note: String,
    process: {
        type: mongoose.Types.ObjectId,
        ref: "Process"
    },
    hisse: [{
        type: mongoose.Types.ObjectId,
        ref: "Hisse"
    }],
    video_path: String,
    video_thumbnail: String,
    video_duration: String,
    video_key: String,
    youtube_embed: String
}, {timestamps: true})

export default mongoose.model('Buyukbas', BuyukbasSchema)