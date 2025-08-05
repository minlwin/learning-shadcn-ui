import { useEffect } from "react"
import { useFormResult } from "~/lib/context/form-result-context"
import { useSubTitle } from "~/lib/context/sub-title-context"
import * as z from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import FormActions from "~/components/app/form-actions"
import FormGroup from "~/components/app/form-group"
import { Input } from "~/components/ui/input"
import FormMessage from "~/components/app/form-message"

const FormSchema = z.object({
    name: z.string().nonempty("Name is required."),
    email : z.email("Invalid email.").nonempty("Email is required"),
    password : z.string().nonempty("Name is required.").length(6, "Email must be 6 characters.")
})

type FormType = z.infer<typeof FormSchema>

export default function UsingSchema() {

    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Schema Validation with Zod"), [setTitle])

    const {setResult} = useFormResult()
    useEffect(setResult, [])

    const {handleSubmit, reset, register,formState : {errors}} = useForm<FormType>({
        resolver: zodResolver(FormSchema),
        defaultValues : {
            name : "",
            email: "",
            password: ""
        }
    })

    const saveAction = (form : FormType) => {
        setResult(JSON.stringify(form, null, 2))
    }

    const clear = () => {
        reset()
        setResult()
    }
    
    return (
        <form onSubmit={handleSubmit(saveAction)}>

            <FormGroup label="Name" className="mb-3">
                <Input {...register('name')} placeholder="Enter Name" />
                {errors.name && <FormMessage message={errors.name.message!} />}
            </FormGroup>

            <FormGroup label="Email" className="mb-3">
                <Input {...register('email')} type="email" placeholder="Enter Email" />
                {errors.email && <FormMessage message={errors.email.message!} />}
            </FormGroup>

            <FormGroup label="Password" className="mb-3">
                <Input {...register('password')} type="password" placeholder="Enter Password" />
                {errors.password && <FormMessage message={errors.password.message!} />}
            </FormGroup>

            <FormActions clear={clear} />
        </form>
    )
}