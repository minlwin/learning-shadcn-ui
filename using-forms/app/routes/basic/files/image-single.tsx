import { useEffect } from "react"
import { useSubTitle } from "~/lib/context/sub-title-context"

export function meta() {
  return [
    { title: "Using Form | Single Image" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function SingleImage() {
    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Single Image File"), [setTitle])

    return (
        <></>
    )
}