import { useEffect } from "react"
import { useSubTitle } from "~/lib/context/sub-title-context"

export default function TextAreaInput() {

    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Using Textarea Input"), [setTitle])

    return (
        <></>
    )
}