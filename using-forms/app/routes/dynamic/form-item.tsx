import { useEffect } from "react"
import { useFormResult } from "~/lib/context/form-result-context"
import { useSubTitle } from "~/lib/context/sub-title-context"

export default function DynamicFormItem() {

    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Dynamic Form Field"), [setTitle])

    const {setResult} = useFormResult()
    useEffect(setResult, [])

    return (
        <></>
    )
}