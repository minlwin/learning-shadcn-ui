import { useEffect } from "react"
import { useFormResult } from "~/lib/context/form-result-context"
import { useSubTitle } from "~/lib/context/sub-title-context"

export default function UiTextInput() {
    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Hook form with UI Input"), [setTitle])

    const {setResult} = useFormResult()
    useEffect(setResult, [])

    return (
        <></>
    )
}