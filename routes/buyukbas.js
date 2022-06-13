import express from 'express'
const router = express.Router()

import { create, findAll, find, update, _delete } from '../controllers/BuyukbasKurbanController.js'

router.post('/:project_id', create)
router.get('/:project_id', findAll)
router.get('/single/:id', find)
router.put('/:id', update)
router.delete('/:id', _delete)

export default router