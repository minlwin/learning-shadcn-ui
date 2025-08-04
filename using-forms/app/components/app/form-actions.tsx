import { Save, Trash } from "lucide-react";
import { Button } from "../ui/button";

export default function FormActions({clear} : {clear : VoidFunction}) {
    return (
        <div>
            <Button type="button" onClick={clear}>
                <Trash /> Clear
            </Button>
            <Button type="submit" className="ms-2">
                <Save /> Save
            </Button>
        </div>
    )
}