import { useEffect } from "react"
import { useSubTitle } from "~/lib/context/sub-title-context"

export default function MultipleImages() {
    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Multiple Image File"), [setTitle])
    
    return (
        <></>
    )
}