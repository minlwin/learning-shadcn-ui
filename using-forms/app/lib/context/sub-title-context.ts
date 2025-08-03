import { createContext, useContext } from "react"

type SubTitleContextType = {
    title : string
    setTitle : (title : string) => void
}

export const SubTitleContext = createContext<SubTitleContextType | undefined>(undefined)

export const useSubTitle = () => {
    const context = useContext(SubTitleContext)

    if(!context) {
        throw new Error("Invalid context usage of Sub Title Context.")
    }

    return context
}