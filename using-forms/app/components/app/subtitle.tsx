import { useSubTitle } from "~/lib/context/sub-title-context"

export default function AppSubTitle() {
    const {title} = useSubTitle()
    return (
        <h3>{title}</h3>
    )
}