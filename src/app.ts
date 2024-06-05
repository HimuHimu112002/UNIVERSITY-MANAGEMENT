import express, {Application} from 'express'
import cors from 'cors'
import { UserRoute } from './app/modules/user/user.routes'
import { AcademicRoute } from './app/modules/academic/academic.routes'
import { AcademicFacultyRoute } from './app/modules/academicFaculty/academicFaculty.routes'
import { AcademicDepartmentRoute } from './app/modules/academicDepartment/academicDepartment.routes'
import globalErrorHandler from './app/middleware/globalErrorhandler'
import { StudentRoutes } from './app/modules/student/student.route'
import { CourseRoutes } from './app/modules/course/course.routes'
const app: Application = express()
app.use(express.json())
app.use(cors())


app.use(globalErrorHandler)
// application routes
app.use('/api/v1/', UserRoute)
app.use('/api/v1/', AcademicRoute)
app.use('/api/v1/', AcademicFacultyRoute)
app.use('/api/v1/', AcademicDepartmentRoute)
app.use('/api/v1/', StudentRoutes)
app.use('/api/v1/', CourseRoutes)


export default app