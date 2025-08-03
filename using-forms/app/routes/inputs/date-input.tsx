import { useEffect } from "react"
import { useSubTitle } from "~/lib/context/sub-title-context"

export default function DateInput() {

    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Using Date Input"), [setTitle])

    return (
        <></>
    )
}