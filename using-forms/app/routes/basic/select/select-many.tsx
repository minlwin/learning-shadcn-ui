import { useEffect } from "react"
import { useForm } from "react-hook-form"
import FormActions from "~/components/app/form-actions"
import FormGroup from "~/components/app/form-group"
import FormMessage from "~/components/app/form-message"
import { useFormResult } from "~/lib/context/form-result-context"
import { useSubTitle } from "~/lib/context/sub-title-context"

export default function SelectMany() {
    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Select Many Form Items"), [setTitle])

    const {setResult} = useFormResult()
    useEffect(setResult, [])

    const {handleSubmit, reset, register, formState : {errors}} = useForm<SelectManyForm>()

    const saveAction = (form : SelectManyForm) => setResult(JSON.stringify(form, null, 2))
    const clear = () => {
        reset()
        setResult()
    }

    return (
        <form onSubmit={handleSubmit(saveAction)}>

            <FormGroup label="Select Options" className="mb-3">
                <select {...register('selects', {validate : (array) => array.length > 0})} multiple className="border-1 rounded-md p-2 w-[200px]">
                {Array.from({length : 3}).map((_, index) => 
                    <option key={index} value={`Level ${index + 1}`}>{`Level ${index + 1}`}</option>
                )}
                </select>
                {errors.selects && <FormMessage message="Option Selects is required." />}
            </FormGroup>

            <FormGroup label="Select Options" className="mb-3">
                <div>
                    {Array.from({length : 3}).map((_, index) => 
                        <label key={index} htmlFor={`check-${index}`} className="me-3">
                            <input {...register('checks', {validate : (checks) => checks.length > 0})} id={`check-${index}`} type="checkbox" value={index + 1} className="me-2" />
                            <span>{`Value ${index + 1}`}</span>
                        </label>
                    )}
                </div>
                {errors.checks && <FormMessage message="Check value is required." />}
            </FormGroup>

            <FormActions clear={clear} />
        </form>
    )
}

type SelectManyForm = {
    checks : number []
    selects : string []
}