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

// render 'a production deploymentta burası .env anadizin göster + client .end de node_env production yap
dotenv.config({ path: './config/config.env' })
const PORT = process.env.PORT || 5001

/* Database */
import connectDB from './config/db.js'
connectDB.connection()

/* Routers */
import userRoutes from './routes/user.js'
import kurumRoutes from './routes/kurum.js'
import adminRoutes from './routes/admin.js'
import projectRoutes from './routes/project.js'
import buyukbasKurbanRoutes from './routes/buyukbas.js'
import kucukbasKurbanRoutes from './routes/kucukbas.js'
import processRoutes from './routes/process.js'
import hisseGroupRoutes from './routes/hisse_group.js'
import hisseRoutes from './routes/hisse.js'
import messageRoutes from './routes/message.js'
import messageAPIRoutes from './routes/message_api.js'
import smsServiceRoutes from './routes/sms_service.js'



//
const app = express()

// socket.io
/*const require = createRequire(import.meta.url)
const http = require('http').createServer(app)
const io = require('socket.io')(http) */

import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  // rejectUnauthorized: false // WARN: please do not do this in production
  cors: {
    origin: process.env.NODE_ENV === "production" ? process.CLIENT_URL_PROD : process.env.CLIENT_URL_LOCAL,
  }
});

// Express 4, in your index.js file set like this then in your router or controller, you can use 
app.set('socketio', io);



/* for properly send request */
app.use(bodyParser.json({limit: '30mb', 'extended': true}))
app.use(bodyParser.urlencoded({limit: '30mb', 'extended': true}))
app.use(bodyParser.raw());
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


// get requestlerde sıkıntı çıktığı için get requestler userRoutes içine import edildi 

app.use('/', userRoutes)
if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '/client/build')))
  
  app.get('*', (req, res) => { 
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html")) //resolve yerine jo,n
  })
}
app.use('/kurum', kurumRoutes)
app.use('/admin', adminRoutes)
// bu şekilde de okey (yani altındaki bütün routelara middleware geçmiş oldun prefix+route+middleware diyebiliriz) 
app.use('/project', kurumMiddleware, projectRoutes) 
app.use('/process', kurumMiddleware, processRoutes)
app.use('/buyukbas-kurban', kurumMiddleware, buyukbasKurbanRoutes)
app.use('/kucukbas-kurban', kurumMiddleware, kucukbasKurbanRoutes)
app.use('/hisse-group', kurumMiddleware, hisseGroupRoutes)
app.use('/hisse', kurumMiddleware, hisseRoutes)
app.use('/message', kurumMiddleware, messageRoutes) // create by kurum for message templates  - relation with MessageTemplate model
app.use('/message-api', messageAPIRoutes) // creeate by admin - relation with MessageAPI model
app.use('/sms-service', smsServiceRoutes) // create by kurum - relation with MessageService model



/*io.on("connection", socket => {
  
  console.log("User connection", socket.client.id);

  socket.on("disconnect", () => {
       console.log("User disconnect");
  });
  
  socket.on("sendMessageToServer", (data) => {
    console.log("sendMessageToServer tetiklendi.");
    console.log((data))
  });

  socket.emit("sendMessageToClient");

  socket.on("disconnect", () => { });
  //socket.removeAllListeners();
});*/


/* Error Handler */
//app.use(errorHandler)

httpServer.listen(PORT, console.log(`Express server running in port ${PORT}`))


/**
 * Admin create a message API name as a message_service_title via MessageAPI model
 * client create a sms api via MessageService model
 * 
 * gsm - message_content - kurum.active_sms_api - getActiveSMSApiInfo  - send message
 */