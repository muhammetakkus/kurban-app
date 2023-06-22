import express from 'express'
const router = express.Router()

// Controller
import { getHissedar, getHissedars, create, update, _delete } from '../controllers/HissedarController.js'

//router.get('/:kurban_id', findByKurbanID)
//router.get('/:project_id', findByProjectID)
router.post('/', create)
router.get('/:kurum_id', getHissedars)
router.get('/single/:id', getHissedar)
router.put('/:id', update)
router.delete('/:id', _delete)

export default router