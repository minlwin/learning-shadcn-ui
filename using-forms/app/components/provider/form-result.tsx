import type React from "react";
import { useState } from "react";
import { FormResultContext } from "~/lib/context/form-result-context";

export default function FormResultContextProvider({children} : {children : React.ReactNode}) {
    
    const [formResult, setFormResult] = useState<string>()

    return (
        <FormResultContext.Provider value={{result : formResult, setResult: setFormResult}}>
            {children}
        </FormResultContext.Provider>
    )
}