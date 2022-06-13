import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: 5,
        lowercase: true
    },
    password : String,
    full_name: String,
    googleId: {
        type: String,
        default: null
    },
    // buraya UserSchema get edildikten sonra .populate('sepet') şeklinde erişilebilir
    sepet: [  
        {   
            // type: Schema.Types.ObjectId,
            // ref: "OnSaleHisse"
        }
    ],
    purchasedHisse: [
        {
            // type: Schema.Types.ObjectId,
            // ref: "PurchasedHisse"
        }
    ]
    // Embedded olarak satın alınan kurban bilgileri purchasedHisse - böyle bir Model olacak - type: kbaş-b.baş-akika-vacip-nafile-nezir
    // Embedded olarak sepete eklenen kurban bilgileri sepet - OnSaleHisse modelinde kurum_id - kurban_id user_id olacak
}, {timestamps: true})



export default mongoose.model('User', UserSchema)