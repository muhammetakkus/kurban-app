import express from 'express'
const router = express.Router()

// Controller
import { projects, create, find, update, _delete } from '../controllers/ProjectController.js'

router.post('/', create) 
router.get('/:project_id', find)
router.put('/:id', update)
router.delete('/:id', _delete)

export default router