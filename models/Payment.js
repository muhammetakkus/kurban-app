import mongoose from 'mongoose'

const PaymentSchema = new mongoose.Schema({
    payment_amount: Double,
    makbuz_no: String,
    hissedar_id: mongoose.Types.ObjectId,
    project_id: mongoose.Types.ObjectId,
    kurum_id: mongoose.Types.ObjectId,
}, {timestamps: true})

export default mongoose.model('Payment', PaymentSchema)