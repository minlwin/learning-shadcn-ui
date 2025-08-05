import { useEffect } from "react"
import { useFormResult } from "~/lib/context/form-result-context"
import { useSubTitle } from "~/lib/context/sub-title-context"

export default function DynamicFormArray() {

    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Dynamic Form Array"), [setTitle])

    const {setResult} = useFormResult()
    useEffect(setResult, [])

    return (
        <></>
    )
}