import express from 'express'
const router = express.Router()
import dotenv from 'dotenv'
dotenv.config({ path: './config/config.env' })

import adminMiddleware from "../middleware/admin.js"
import { login  } from '../controllers/AdminController.js'

router.post('/login', login)

export default router