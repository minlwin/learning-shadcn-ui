import { createContext, useContext } from "react"

type TitleContextType = {
    title : string
    setTitle: (title: string) => void
}

const TitleContext = createContext<TitleContextType | undefined>(undefined)

const useTitleContext = () => {
    const context = useContext(TitleContext)

    if(!context) {
        throw new Error("Invalid usage of Title Context")
    }

    return context
}

export {
    TitleContext,
    useTitleContext
}