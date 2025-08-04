import { useEffect } from "react"
import { useSubTitle } from "~/lib/context/sub-title-context"

export default function SingleImage() {
    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Single Image File"), [setTitle])

    return (
        <></>
    )
}