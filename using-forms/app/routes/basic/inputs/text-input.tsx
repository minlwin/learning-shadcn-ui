import { useEffect } from "react"
import { useForm } from "react-hook-form"
import FormActions from "~/components/app/form-actions"
import FormGroup from "~/components/app/form-group"
import FormMessage from "~/components/app/form-message"
import { Input } from "~/components/ui/input"
import { useFormResult } from "~/lib/context/form-result-context"
import { useSubTitle } from "~/lib/context/sub-title-context"

export function meta() {
  return [
    { title: "Using Form | Text Input" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function TextInput() {

    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Using Text Input"), [setTitle])
    const {setResult} = useFormResult()

    const {handleSubmit, register, reset, formState : {errors}} = useForm<TestInputForm>()
    
    const action = (form: TestInputForm) => {
        setResult(JSON.stringify(form, null, 2))
    }

    const clear = () => {
        reset()
        setResult()
    }

    useEffect(setResult, [])

    return (
        <form onSubmit={handleSubmit(action)}>
            <FormGroup label="Name" className="mb-3">
                <Input {...register('name', {required : true})} placeholder="Enter Name" />
                {errors.name && <FormMessage message="Name is required." />}
            </FormGroup>  
            <FormGroup label="Password" className="mb-3">
                <Input {...register('password', {required : true})} type="password" placeholder="Enter Password"/>
                {errors.password && <FormMessage message="Password is required." />}
            </FormGroup>  
            <FormGroup label="Phone" className="mb-3">
                <Input {...register('phone', {required : true})} type="tel" placeholder="Enter Phone" />
                {errors.phone && <FormMessage message="Phone is required." />}
            </FormGroup>  
            <FormGroup label="Email" className="mb-3">
                <Input {...register('email', {required : true})} type="email" placeholder="Enter Email" />
                {errors.email && <FormMessage message="Email is required." />}
            </FormGroup>  

            <FormActions clear={clear} />
        </form>
    )
}

type TestInputForm = {
    name : string
    password : string
    dob : string
    phone : string
    email : string
}