import { Save, Trash } from "lucide-react";
import { Button } from "../ui/button";
import type React from "react";

export default function FormActions({clear, children} : {clear : VoidFunction, children? : React.ReactNode}) {
    return (
        <div>
            {children && 
                <span className="me-2">
                    {children}
                </span>
            }
            <Button type="button" onClick={clear}>
                <Trash /> Clear
            </Button>
            <Button type="submit" className="ms-2">
                <Save /> Save
            </Button>
        </div>
    )
}