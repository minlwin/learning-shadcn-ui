import { useEffect } from "react"
import { useSubTitle } from "~/lib/context/sub-title-context"

export default function TestFile() {
    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Test File Input"), [setTitle])
    return (
        <></>
    )
}