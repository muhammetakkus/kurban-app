import express from 'express'
const router = express.Router()

// Controller - Kullanıcının oluşturduğu message templates
import { messages, create, find, update, _delete, send} from '../controllers/MessageController.js'

router.post("/send", send)

router.get('/all/:kurum_id', messages)
router.post('/:kurum_id', create)
router.get('/:id', find)
router.put('/:id', update)
router.delete('/:id', _delete)
export default router