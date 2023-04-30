import express from 'express'
const router = express.Router()

// Controller
import { processes, create, find, update, _delete } from '../controllers/ProcessController.js'

//router.get('/all/:kurum_id', processes)
router.post('/:kurum_id', create)
router.get('/:id', find)
router.put('/:id', update)
router.delete('/:id', _delete)

export default router