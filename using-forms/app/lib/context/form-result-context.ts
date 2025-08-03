import { createContext, useContext } from "react"

type FormResultContextType = {
    result? : string
    setResult : (result?: string) => void 
} | undefined

export const FormResultContext = createContext<FormResultContextType>(undefined)

export function useFormResult() {
    const context = useContext(FormResultContext)

    if(!context) {
        throw new Error("Invalid context usage of Form Result.")
    }

    return context;
}