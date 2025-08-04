import { Save, Trash } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import FormActions from "~/components/app/form-actions"
import FormGroup from "~/components/app/form-group"
import FormMessage from "~/components/app/form-message"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { useFormResult } from "~/lib/context/form-result-context"
import { useSubTitle } from "~/lib/context/sub-title-context"

export default function DateInput() {

    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Using Date Input"), [setTitle])

    const {handleSubmit, reset, register, formState : {errors}} = useForm<DateForm>()
    const {setResult} = useFormResult()

    const submitAction = (form:DateForm) => {
        setResult(JSON.stringify(form, null, 2))
    }

    const clear = () => {
        reset()
        setResult()
    }

    useEffect(setResult, [])

    return (
        <form onSubmit={handleSubmit(submitAction)}>
            
            <FormGroup label="Date Input" className="mb-3">
                <Input {...register('date', {required : true})} type="date" />
                {errors.date && <FormMessage message="Date is required" />}
            </FormGroup>

            <FormGroup label="Time Input" className="mb-3">
                <Input {...register('time', {required : true})} type="time" />
                {errors.time && <FormMessage message="Time is required" />}
            </FormGroup>

            <FormGroup label="Date Time Input" className="mb-3">
                <Input {...register('dateTime', {required : true})} type="datetime-local" />
                {errors.dateTime && <FormMessage message="Date Time is required" />}
            </FormGroup>

            <FormActions clear={clear} />
        </form>
    )
}

type DateForm = {
    date : string
    time : string
    dateTime : string
}