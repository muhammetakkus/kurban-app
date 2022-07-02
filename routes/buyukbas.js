import express from 'express'
import multer from 'multer'

const router = express.Router()

import { create, update, _delete, uploadKurbanVideo } from '../controllers/BuyukbasKurbanController.js'

router.post('/:project_id', create)

router.put('/:id', update)







const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //cb(null, 'client/public/uploads');
        cb(null, 'client/src/assets/uploads');
    },
    filename: (req, file, cb) => {
        const newName = new Date().toISOString()
        cb(null, newName + ".mp4");
        //cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
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
const upload = multer({storage: storage});

router.post('/video/:id', upload.single('file'), uploadKurbanVideo)

router.delete('/:id', _delete)

export default router