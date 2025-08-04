import { useEffect } from "react"
import { useForm } from "react-hook-form"
import FormActions from "~/components/app/form-actions"
import FormGroup from "~/components/app/form-group"
import FormMessage from "~/components/app/form-message"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { useFormResult } from "~/lib/context/form-result-context"
import { useSubTitle } from "~/lib/context/sub-title-context"

export default function TextAreaInput() {

    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Using Textarea Input"), [setTitle])

    const {handleSubmit, reset, register, formState : {errors}} = useForm<TextAreaForm>()
    const {setResult} = useFormResult()

    const submitAction = (form : TextAreaForm) => setResult(JSON.stringify(form, null, 2))
    
    const clear = () => {
        reset()
        setResult()
    }

    useEffect(setResult, [])

    return (
        <form onSubmit={handleSubmit(submitAction)}>

            <FormGroup label="Title" className="mb-3">
                <Input {...register('title', {required : true})} placeholder="Enter title" />
                {errors.title && <FormMessage message="Title is required." />} 
            </FormGroup>

            <FormGroup label="Details" className="mb-3">
                <Textarea {...register('details', {required : true})} placeholder="Enter Details Information" />
                {errors.details && <FormMessage message="Title is required." />} 
            </FormGroup>

            <FormActions clear={clear} />
        </form>
    )
}

type TextAreaForm = {
    title : string
    details : string
}