/* */
import kurumMiddleware from "../middleware/kurum.js"

/* Routers */
import userRoutes from './user.js'
import kurumRoutes from './kurum.js'
import projectRoutes from './project.js'
import buyukbasKurbanRoutes from './buyukbas.js'
import kucukbasKurbanRoutes from './kucukbas.js'
import processRoutes from './process.js'
import hisseGroupRoutes from './hisse_group.js'
import hisseRoutes from './hisse.js'
import messageRoutes from './message.js'

app.use('/', userRoutes)
app.use('/kurum', kurumRoutes)
app.use('/project', kurumMiddleware, projectRoutes) 
app.use('/process', kurumMiddleware, processRoutes)
app.use('/buyukbas-kurban', kurumMiddleware, buyukbasKurbanRoutes)
app.use('/kucukbas-kurban', kurumMiddleware, kucukbasKurbanRoutes)
app.use('/hisse-group', kurumMiddleware, hisseGroupRoutes)
app.use('/hisse', kurumMiddleware, hisseRoutes)
app.use('/message', kurumMiddleware, messageRoutes)