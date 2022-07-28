import express from 'express'
const router = express.Router()

// Controller - kurum oluşturduğu sms service
import { create, update, _delete } from '../controllers/MessageServiceController.js'

router.post('/', create)
router.put('/:id', update)
router.delete('/:id', _delete)

export default router