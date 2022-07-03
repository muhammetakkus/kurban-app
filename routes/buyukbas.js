import express from 'express'
import multer from 'multer'
import multerS3 from 'multer-s3'
import { S3Client } from '@aws-sdk/client-s3'

const router = express.Router()

import { create, update, _delete, uploadKurbanVideo } from '../controllers/BuyukbasKurbanController.js'

router.post('/:project_id', create)

router.put('/:id', update)







/*const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //cb(null, 'client/public/uploads');
        cb(null, 'client/src/assets/uploads');
    },
    filename: (req, file, cb) => {
        const newName = new Date().toISOString()
        cb(null, newName + ".mp4");
        //cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
})*/

const s3 = new S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: "AKIA2TX3M3FXLU7HVZJI",
        secretAccessKey: "6i7wnkFIHxFbj3ezXJepFRyauuHTI2RlzViXR+P+"
    },
    // bunlar olmasa da olur - kaldır - dene
    hostPrefixEnabled: true,
    computeChecksums: true,
    s3BucketEndpoint: true,
    correctClockSkew: true
    
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'kurbanapp',
    ACL: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + ".mp4")
    }
  })
})

// image için olan validation mp4 olarak değiştirilecek
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' 
        || file.mimetype === 'image/jpeg'){
            cb(null, true);
        }else {
            cb(null, false);
        }
}

//const upload = multer({storage: storage, fileFilter: filefilter})
//const upload = multer({storage: storage});

router.post('/video/:id', upload.single('file'), uploadKurbanVideo)

router.delete('/:id', _delete)

export default router