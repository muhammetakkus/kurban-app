import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Admin from '../models/Admin.js'

const protect = asyncHandler(async (req, res, next) => {
    // req.header('x-auth-token') ???
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            req.admin = await Admin.findById(decoded.id).select('-password') // select minus -> objeden o fieldı çıkarıyor
            
            if(decoded && req.admin) { next() } else { throw new Error('oops this is not admin auth') }
            
        } catch (error) {
            res.status(401);
            res.json({ here: 'middleware/admin', error: error.message })
        }
    }

    if (!token) {
        res.status(401)
        res.json({ error: 'Not authorized, no token' })
    }
})

export default protect