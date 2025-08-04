import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useFormResult } from "~/lib/context/form-result-context"
import { useSubTitle } from "~/lib/context/sub-title-context"

export default function SelectOne() {
    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Select One Form Items"), [setTitle])

    const {handleSubmit} = useForm<SelectOneForm>()
    const {setResult} = useFormResult()

    const submitAction = (form: SelectOneForm) => {
        setResult(JSON.stringify(form, null, 2))
    }

    return (
        <form onSubmit={handleSubmit(submitAction)}></form>
    )
}

type SelectOneForm = {
    radio : string
    select : string
}
