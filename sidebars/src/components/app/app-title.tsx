import { useSidebar } from "@/hooks/use-sidebar"
import { useTitleContext } from "@/hooks/use-title"
import { ArrowRight } from "lucide-react"

export default function AppTitle() {

    const {title} = useTitleContext()
    const {open, toggleSidebar} = useSidebar()

    return (
        <nav className="flex items-center gap-2 px-4 py-4">
            {!open && 
                <span onClick={toggleSidebar}>
                    <ArrowRight size={24} />
                </span>
            }

            <h3 className="text-xl">{title}</h3>
        </nav>
    )
}