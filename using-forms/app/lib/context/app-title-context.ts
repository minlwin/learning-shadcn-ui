import { createContext, useContext } from "react"
import type { Title } from "../types"

export type AppTitleContextType = {
    title? : Title
    setTitle : (title:Title) => void 
} 

export const AppTitleContext = createContext<AppTitleContextType | undefined>(undefined)

export const useAppTitle = () => {
    const context = useContext(AppTitleContext) 

    if(!context) {
        throw new Error("Invalid context usage of AppTitleContext")
    }

    return context
}