import {z} from 'zod'
export const AcademicDepartmentValidationSchema = z.object({   
    body: z.object({
        name: z.string({invalid_type_error: 'Name must be required!'}), 
        academicFaculty: z.string({
            invalid_type_error: 'Academic Faculty must be required!',
            required_error: 'Faculty is required !'
        }), 
    })
})
