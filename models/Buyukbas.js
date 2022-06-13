import mongoose from 'mongoose'

const BuyukbasSchema = new mongoose.Schema({
    kurum_id: mongoose.Types.ObjectId,
    project_id: mongoose.Types.ObjectId,
    kurban_no: Number,
    kurban_process: {
        type: String,
        default: 'KAYIT'
    },
    kurban_kupe_no: String,
    kurban_hisse_group: String,
    net_hisse_fiyat: Number,
    uniq_kurban_code: String,
    kurban_image: String,
    kurban_weight: String,
    kurban_note: String,
    hisse: [{
        type: mongoose.Types.ObjectId,
        ref: "Hisse"
    }]
}, {timestamps: true})

export default mongoose.model('Buyukbas', BuyukbasSchema)