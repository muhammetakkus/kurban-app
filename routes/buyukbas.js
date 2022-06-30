import express from 'express'
const router = express.Router()

import { create, update, _delete } from '../controllers/BuyukbasKurbanController.js'

router.post('/:project_id', create)

router.put('/:id', update)
router.delete('/:id', _delete)

export default router