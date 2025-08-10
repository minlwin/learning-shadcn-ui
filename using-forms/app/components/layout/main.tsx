import { AppTitleContext } from "~/lib/context/app-title-context";
import { useState } from "react";
import type { Title } from "~/lib/types";
import { Outlet } from "react-router";
import { SidebarProvider } from "../ui/sidebar";
import AppSidebar from "../app/sidebar";
import AppTitle from "../app/title";
import CustomCard from "../custom/custom-card";

export function meta() {
  return [
    { title: "Using Form | Home" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Layout() {
    const [title, setTitle] = useState<Title>()
    return (
        <SidebarProvider>
            <AppTitleContext.Provider value={{title : title, setTitle: setTitle}}>
                <AppSidebar />

                <div className="w-full pe-2 py-2 h-screen flex flex-col">
                    <AppTitle />                    
                    <main className="mt-2 flex-1">
                        <CustomCard className="h-full">
                            <Outlet />
                        </CustomCard>
                    </main>
                </div>
            </AppTitleContext.Provider>
        </SidebarProvider>
    )
}