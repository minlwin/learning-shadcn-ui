import { useEffect } from "react"
import { useSubTitle } from "~/lib/context/sub-title-context"

export function meta() {
  return [
    { title: "Using Form | Text File" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function TestFile() {
    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Test File Input"), [setTitle])
    return (
        <></>
    )
}