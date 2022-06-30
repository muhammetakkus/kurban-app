import express from 'express'
const router = express.Router()
import dotenv from 'dotenv'
dotenv.config({ path: './config/config.env' })

// router.get('/', auth, index) 
import userMiddleware from "../middleware/user.js"

// Controllers
//import { index } from '../controllers/HomeController.js'
import { login, users, register, find, update, _delete, getKurbanInfo } from '../controllers/UserController.js'

import passport from 'passport'
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

router.post('/user/login', login)
router.post('/user/register', register)

// bunlara admin middleware geçilecek
router.get('/users', userMiddleware, users)
router.get('/user/:id', find)
router.put('/user/:id', update)
router.delete('/user/:id', _delete)


router.get('/user/kurban-info/:kurban_code', getKurbanInfo)



import kurumMiddleware from "../middleware/kurum.js"

/* */
import { projects, findProject } from '../controllers/ProjectController.js'
router.get('/project/all/:kurum_id', projects)
router.get('/project/:id', findProject)

import { getAll } from '../controllers/DashboardMenuController.js'
router.get('/kurum/menus', kurumMiddleware, getAll)


import { processes } from '../controllers/ProcessController.js'
router.get('/process/all/:kurum_id', processes)

import { messages } from '../controllers/MessageController.js'
router.get('/message/all/:kurum_id', messages)

import { findAll } from '../controllers/BuyukbasKurbanController.js'
router.get('/buyukbas-kurban/:project_id', findAll)

import { hisse_groups, findHisseGroup } from '../controllers/HisseGroupController.js'
router.get('/hisse-group/all/:project_id', hisse_groups)
router.get('/hisse-group/:id', findHisseGroup)


import { findByProjectID, findByKurbanID } from '../controllers/HisseController.js'
router.get('/hisse/:kurban_id', findByKurbanID)
router.get('/hisse/:project_id', findByProjectID)

import ekran from "./ekran.js"
router.use('/ekran', ekran)

import { findAll, find, findForEkran } from '../controllers/BuyukbasKurbanController.js'

router.get('/buyukbas-kurban/:project_id', findAllBuyukbas)
router.get('/buyukbas-kurban/single/:id', findSingleBuyukbas)
router.get('/buyukbas-kurban/process/:kurum_id/:project_id/:process_id/:self', findForEkran)

export default router