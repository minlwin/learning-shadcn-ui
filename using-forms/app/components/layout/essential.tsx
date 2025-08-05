import { Shield } from "lucide-react"
import { useEffect, useState } from "react"
import { Outlet } from "react-router"
import { useAppTitle } from "~/lib/context/app-title-context"
import { SubTitleContext } from "~/lib/context/sub-title-context"
import FormResultViewer from "../app/result-viewer"
import AppSubTitle from "../app/subtitle"
import FormResultContextProvider from "../provider/form-result"

export default function AppEssentialLayout() {

    const {setTitle} = useAppTitle()

    useEffect(() => {
        setTitle({
            label: "Form Essentials",
            icon: Shield
        })
    }, [setTitle])

    const [subTitle, setSubTitle] = useState("Form Essentials")

    return (
        <SubTitleContext.Provider value={{title : subTitle, setTitle : setSubTitle}}>
            <AppSubTitle />
            <FormResultContextProvider>
                <section className="flex gap-8 w-full mt-4 items-center">
                    <div className="w-full">
                        <Outlet />
                    </div>
                    <div className="w-full">
                        <FormResultViewer />
                    </div>
                </section>
            </FormResultContextProvider>
        </SubTitleContext.Provider>
    )
}