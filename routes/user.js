import express from 'express'
const router = express.Router()
import dotenv from 'dotenv'
dotenv.config({ path: './config/config.env' })

// router.get('/', auth, index) 
import userMiddleware from "../middleware/user.js"

// Controllers
import { index } from '../controllers/HomeController.js'
import { login, users, register, find, update, _delete } from '../controllers/UserController.js'

import passport from 'passport'
/*

router.get('/', (req, res) => {
    res.send('Home Page - Welcome to node and express app...')
    let users = User.find({})
    console.log(users);
}) 

*/

router.get('/', index)


import kurumRoutes from './kurum.js'
import projectRoutes from './project.js'
import buyukbasKurbanRoutes from './buyukbas.js'
import kucukbasKurbanRoutes from './kucukbas.js'
import processRoutes from './process.js'
import hisseGroupRoutes from './hisse_group.js'
import hisseRoutes from './hisse.js'
import messageRoutes from './message.js'
import kurumMiddleware from "../middleware/kurum.js"

router.use('/kurum', kurumRoutes)
router.use('/project', kurumMiddleware, projectRoutes) 
router.use('/process', kurumMiddleware, processRoutes)
router.use('/buyukbas-kurban', kurumMiddleware, buyukbasKurbanRoutes)
router.use('/kucukbas-kurban', kurumMiddleware, kucukbasKurbanRoutes)
router.use('/hisse-group', kurumMiddleware, hisseGroupRoutes)
router.use('/hisse', kurumMiddleware, hisseRoutes)
router.use('/message', kurumMiddleware, messageRoutes)


/* Bu alt taraf farklı bir dosyaya taşınacak*/ 

/* */
  router.get("/login/success", (req, res) => {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        //   cookies: req.cookies
      });
    }
  });

  

  router.get("/login/failed", (req, res) => {
    console.log(res);
    res.status(401).json({
      success: false,
      message: "failure",
    });
  });
  
  router.get("/logout", (req, res) => {
    req.logout(req, err => {
      if(err) return next(err);
      res.redirect(process.env.CLIENT_URL);
    });
  });


  router.get("/google", passport.authenticate("google", { scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ]}));

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL+'/google-auth',
    failureRedirect: "/login/failed",
  })
);


/**/

router.post('/user/login', login)
router.post('/user/register', register)

// bunlara admin middleware geçilecek
router.get('/users', userMiddleware, users)
router.get('/user/:id', find)
router.put('/user/:id', update)
router.delete('/user/:id', _delete)



export default router