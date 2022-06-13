import express from 'express'
const router = express.Router()

// Controller
import { hisse_groups, create, find, update, _delete } from '../controllers/HisseGroupController.js'

router.get('/all/:project_id', hisse_groups)
router.post('/', create)
router.get('/:id', find)
router.put('/:id', update)
router.delete('/:id', _delete)

export default router