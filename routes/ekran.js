import express from 'express'
const router = express.Router()

// Controller
import { ekrans, create, find, update, _delete } from '../controllers/EkranController.js'

router.get('/all/:kurum_id', ekrans)
router.post('/', create) 
router.get('/:id', find)
router.put('/:id', update)
router.delete('/:id', _delete)

export default router