import { Delete, Save, Trash } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import FormGroup from "~/components/app/form-group"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { useFormResult } from "~/lib/context/form-result-context"
import { useSubTitle } from "~/lib/context/sub-title-context"

export default function TextInput() {

    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Using Text Input"), [setTitle])
    const {setResult} = useFormResult()

    const {handleSubmit, register, reset} = useForm<TestInputForm>()
    
    const action = (form: TestInputForm) => {
        setResult(JSON.stringify(form, null, 2))
    }

    return (
        <form onSubmit={handleSubmit(action)}>
            <FormGroup label="Name" className="mb-3">
                <Input {...register('name')} placeholder="Enter Name" />
            </FormGroup>  
            <FormGroup label="Password" className="mb-3">
                <Input {...register('password')} type="password" placeholder="Enter Password"/>
            </FormGroup>  
            <FormGroup label="Phone" className="mb-3">
                <Input {...register('phone')} type="tel" placeholder="Enter Phone" />
            </FormGroup>  
            <FormGroup label="Email" className="mb-3">
                <Input {...register('email')} type="email" placeholder="Enter Email" />
            </FormGroup>  

            <div>
                <Button onClick={() => reset()} variant={"outline"} className="me-2">
                    <Trash /> Clear
                </Button>
                <Button type="submit">
                    <Save /> Save
                </Button>
            </div>
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