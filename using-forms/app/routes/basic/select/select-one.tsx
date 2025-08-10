import { useEffect } from "react"
import { useForm } from "react-hook-form"
import FormActions from "~/components/app/form-actions"
import FormGroup from "~/components/app/form-group"
import FormMessage from "~/components/app/form-message"
import { Label } from "~/components/ui/label"
import { useFormResult } from "~/lib/context/form-result-context"
import { useSubTitle } from "~/lib/context/sub-title-context"

export function meta() {
  return [
    { title: "Using Form | Select One" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function SelectOne() {
    const {setTitle} = useSubTitle()
    const {setResult} = useFormResult()

    useEffect(() => setTitle("Select One Form Items"), [setTitle])
    useEffect(setResult, [])

    const {handleSubmit, reset, register, formState : {errors}} = useForm<SelectOneForm>()

    const submitAction = (form: SelectOneForm) => {
        setResult(JSON.stringify(form, null, 2))
    }

    const clear = () => {
        reset()
        setResult()
    }

    return (
        <form onSubmit={handleSubmit(submitAction)}>

            <FormGroup label="Radio Select" className="mb-3">
                {Array.from({length : 3}).map((_, index) => 
                    <Label htmlFor={`radio-${index}`} className="mb-2">
                        <input {...register('radio', {required : true})} type="radio" id={`radio-${index}`} value={index} />
                        <span>{`Level ${index + 1}`}</span>
                    </Label>
                )}
                {errors.radio && <FormMessage message="Radio Select Value is required ." />}
            </FormGroup>

            <FormGroup label="Option Select" className="mb-3">
                <select {...register('select', {required : true})} className="w-[200px] border-2 p-1.5 rounded-lg text-sm">
                    <option value="">Select One</option>
                    {Array.from({length : 3}).map((_, index) => 
                        <option value={index}>{`Option ${index + 1}`}</option>
                    )}
                </select>
                {errors.select && <FormMessage message="Option Select Value is required ." />}
            </FormGroup>

            <FormActions clear={clear} />
        </form>
    )
}

type SelectOneForm = {
    radio : string
    select : string
}
