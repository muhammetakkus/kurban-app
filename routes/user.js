import express from 'express'
const router = express.Router()
import dotenv from 'dotenv'
dotenv.config({ path: './config/config.env' })

// router.get('/', auth, index) 
import userMiddleware from "../middleware/user.js"

// Controllers
//import { index } from '../controllers/HomeController.js'

import passport from 'passport'


import { login, kurums, register } from '../controllers/KurumController.js'

router.get('/kurum/', kurums)
//router.get('/:id/projects', kurumMiddleware, kurums)
router.post('/kurum/login', login)
router.post('/kurum/register', register)




import { projects } from '../controllers/ProjectController.js'

/* Kurum login olduğunda projeler sayfasından gelecek request */
router.get('/project/all/:kurum_id', projects) // /kurum/kurum_id/project


/*

router.get('/', (req, res) => {
    res.send('Home Page - Welcome to node and express app...')
    let users = User.find({})
    console.log(users);
}) 

*/

//router.get('/', index)

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





export default router