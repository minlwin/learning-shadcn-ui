import { useEffect } from "react"
import { useSubTitle } from "~/lib/context/sub-title-context"

export function meta() {
  return [
    { title: "Using Form | Multiple Images" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function MultipleImages() {
    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Multiple Image File"), [setTitle])
    
    return (
        <></>
    )
}