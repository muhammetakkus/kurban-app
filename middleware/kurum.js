import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Kurum from '../models/Kurum.js'

const protect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, "kurbanapp")
            req.kurum = await Kurum.findById(decoded.id).select('-password')
            
            if(decoded && req.kurum) { next() } else { throw new Error('oops this is not kurum auth') }
        } catch (error) {
            res.status(401);
            res.json({ here: 'middleware/kurum', error: error.message })
        }
    }

    if (!token) {
        res.status(401)
        res.json({ error: 'Not authorized, no token' })
    }
})

export default protect