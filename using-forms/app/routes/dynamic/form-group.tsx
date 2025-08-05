import { useEffect } from "react"
import { useFormResult } from "~/lib/context/form-result-context"
import { useSubTitle } from "~/lib/context/sub-title-context"

export default function DynamicFormGroup() {

    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Dynamic Form Group"), [setTitle])

    const {setResult} = useFormResult()
    useEffect(setResult, [])

    return (
        <></>
    )
}