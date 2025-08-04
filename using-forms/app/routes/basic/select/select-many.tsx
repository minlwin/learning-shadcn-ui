import { useEffect } from "react"
import { useSubTitle } from "~/lib/context/sub-title-context"

export default function SelectMany() {
    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Select Many Form Items"), [setTitle])
    return (
        <></>
    )
}