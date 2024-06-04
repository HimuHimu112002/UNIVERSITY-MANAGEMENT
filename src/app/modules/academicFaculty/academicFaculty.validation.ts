import {z} from 'zod'
export const AcademicFacultyValidationSchema = z.object({   
    body: z.object({
        name: z.string({invalid_type_error: 'Name must be required!'}), 
    })
})
