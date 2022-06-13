import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import session from 'express-session'
import passport from 'passport'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//import errorHandler from './middleware/error.js'

dotenv.config({ path: './config/config.env' })
const PORT = process.env.PORT || 5001

console.log(process.env.PORT)

/* Database */
import connectDB from './config/db.js'
connectDB()

/* Routers */
import userRoutes from './routes/user.js'
import kurumRoutes from './routes/kurum.js'
import projectRoutes from './routes/project.js'
import buyukbasKurbanRoutes from './routes/buyukbas.js'
import kucukbasKurbanRoutes from './routes/kucukbas.js'
import processRoutes from './routes/process.js'
import hisseGroupRoutes from './routes/hisse_group.js'
import hisseRoutes from './routes/hisse.js'
import messageRoutes from './routes/message.js'

const app = express()

/* for properly send request */
app.use(bodyParser.json({limit: '30mb', 'extended': true}))
app.use(bodyParser.urlencoded({limit: '30mb', 'extended': true}))
//app.use(cors({origin: ["http://localhost:3000"], credentials: true}))
//app.use(cors())

/* PassportJS Google OAuth */
import './config/passport.js'

app.use(
    cors({
      origin: process.env.NODE_ENV === "production" ? process.CLIENT_URL_PROD : process.env.CLIENT_URL_LOCAL,
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );
  
  // Sessions
app.use(
    session({
      secret: 'kurban app',
      resave: false,
      saveUninitialized: false,
      //store: MongoStore.create({mongoUrl: process.env.MONGO_URI}),
    })
  )
  
app.use(passport.initialize());
app.use(passport.session());

/* */
import kurumMiddleware from "./middleware/kurum.js"


/* Routers - şöyle bir şey var buradan :parametre router'a geçilirse bu seviyeden yakalanıyor örneğin buradan :id geçiğ projectRoutes altında çağrılan controllerdan yakalanamıyor */ 
// For Heroku Deployment - this should be top of routes?
if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '/client/build')))
  

}
app.use('/', userRoutes)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
})
app.use('/kurum', kurumRoutes)
// bu şekilde de okey (yani altındaki bütün routelara middleware geçmiş oldun prefix+route+middleware diyebiliriz) 
app.use('/project', kurumMiddleware, projectRoutes) 
app.use('/process', kurumMiddleware, processRoutes)
app.use('/buyukbas-kurban', kurumMiddleware, buyukbasKurbanRoutes)
app.use('/kucukbas-kurban', kurumMiddleware, kucukbasKurbanRoutes)
app.use('/hisse-group', kurumMiddleware, hisseGroupRoutes)
app.use('/hisse', kurumMiddleware, hisseRoutes)
app.use('/message', kurumMiddleware, messageRoutes)

/* Error Handler */
//app.use(errorHandler)

app.listen(PORT, console.log(`Express server running in port ${PORT}`))
