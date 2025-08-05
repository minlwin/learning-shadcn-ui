import { useEffect } from "react"
import { useFormResult } from "~/lib/context/form-result-context"
import { useSubTitle } from "~/lib/context/sub-title-context"

export default function UsingSchema() {

    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Schema Validation with Zod"), [setTitle])

    const {setResult} = useFormResult()
    useEffect(setResult, [])
    
    return (
        <></>
    )
}