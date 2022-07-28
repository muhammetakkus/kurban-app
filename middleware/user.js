import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/User.js'

const protect = asyncHandler(async (req, res, next) => {
    // req.header('x-auth-token') ???
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password') // bu select minus çıkarılacak obj
            console.log(req);
            if(decoded && req.user) { next() } else { throw new Error('oops this is not kurum auth') }
            
        } catch (error) {
            res.status(401);
            res.json({ here: 'middleware/user', error: error.message })
        }
    }

    if (!token) {
        res.status(401)
        res.json({ error: 'Not authorized, no token' })
    }
})

export default protect