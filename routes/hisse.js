import express from 'express'
const router = express.Router()

// Controller
import { findByProjectID, findByKurbanID, create, find, update, _delete } from '../controllers/HisseController.js'

router.get('/:kurban_id', findByKurbanID)
router.get('/:project_id', findByProjectID)
router.post('/', create)
router.get('/:id', find)
router.put('/:id', update)
router.delete('/:id', _delete)

export default router