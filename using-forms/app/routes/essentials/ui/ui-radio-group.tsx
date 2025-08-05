import { useEffect } from "react"
import { useFormResult } from "~/lib/context/form-result-context"
import { useSubTitle } from "~/lib/context/sub-title-context"

export default function UiRadioGroup() {
    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Hook Form with UI Radio Group"), [setTitle])

    const {setResult} = useFormResult()
    useEffect(setResult, [])
    return (
        <></>
    )
}