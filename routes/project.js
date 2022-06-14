import express from 'express'
const router = express.Router()

// Controller
import { create, find, update, _delete } from '../controllers/ProjectController.js'

/* Kurum login olduğunda projeler sayfasından gelecek request */
//router.get('/all/:kurum_id', projects) // /kurum/kurum_id/project
router.post('/:kurum_id', create) 
router.get('/:id', find) // /kurum/kurum_id/project/project_id
router.put('/:id', update)
router.delete('/:id', _delete)

export default router