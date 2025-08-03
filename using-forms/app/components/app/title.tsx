import { Home } from "lucide-react";
import { useAppTitle } from "~/lib/context/app-title-context";

export default function AppTitle() {
    const {title} = useAppTitle()

    if(title) {
        return (
            <section className="p-4 border-1 shadow rounded-lg h-16">
                <h3 className="flex items-center text-xl">
                    {
                        title.icon ? <title.icon className="me-2" /> : <Home />
                    } 
                    {title.label}</h3>
            </section>
        )
    }

    return (
        <section className="p-4 border-1 shadow rounded-lg h-16">
            <h3 className="flex items-center text-xl"><Home className="me-2" /> Using Form</h3>
        </section>
    )
}