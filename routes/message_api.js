import express from 'express'
const router = express.Router()

// Controller - adminin oluşturduğu messageAPIs
import { create, update, _delete } from '../controllers/MessageAPIController.js'

router.post('/', create)
//router.get('/:id', find)
router.put('/:id', update)
router.delete('/:id', _delete)

export default router