import { useEffect } from "react"
import { useFormResult } from "~/lib/context/form-result-context"
import { useSubTitle } from "~/lib/context/sub-title-context"

export default function UiSelect() {
    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Hook Form with UI Select"), [setTitle])

    const {setResult} = useFormResult()
    useEffect(setResult, [])

    return (
        <></>
    )
}