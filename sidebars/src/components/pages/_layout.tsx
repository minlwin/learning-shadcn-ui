import { Outlet } from "react-router"
import { SidebarProvider } from "../ui/sidebar"
import { useState } from "react"
import { TitleContext } from "@/hooks/use-title"
import AppTitle from "../app/app-title"
import { AppSideBar } from "../app/app-side-bar"

export default function Layout() {

    const [title, setTitle] = useState("Using Sidebar")

    return (
        <SidebarProvider>
            <TitleContext.Provider value={{title: title, setTitle : setTitle}}>
                <AppSideBar />

                <div>
                    <AppTitle />
                    <main>
                        <Outlet />
                    </main>
                </div>
            </TitleContext.Provider>
        </SidebarProvider>
    )
}

