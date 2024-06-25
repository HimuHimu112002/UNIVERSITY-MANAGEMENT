import express, {Application} from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middleware/globalErrorhandler'
import router from './app/routes'
const app: Application = express()
import cookieParser from 'cookie-parser';


app.use(express.json())
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5000'] }));


// application routes
app.use('/api/v1',router)


// application global Error Handler
app.use(globalErrorHandler)

export default app