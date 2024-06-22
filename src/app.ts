import express, {Application} from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middleware/globalErrorhandler'
import router from './app/routes'
const app: Application = express()
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/v1',router)


// application global Error Handler
app.use(globalErrorHandler)

export default app