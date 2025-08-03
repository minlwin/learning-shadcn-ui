import type React from "react";
import type { IconType } from "~/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Check } from "lucide-react";

export default function CustomCard({title, children, className} : {
    title? : {
        label : string,
        icon? : IconType,
    },
    className?: string
    children? : React.ReactNode,
}) {
    return (
        <Card className={`${className} rounded-lg`}>
            {
                title && 
                <CardHeader>
                    <CardTitle className="flex items-center">
                        {title.icon ? <title.icon /> : <Check />} 
                        <span className="ms-2 text-xl">{title.label}</span>
                    </CardTitle>
                </CardHeader>
            }
            {
                children && 
                <CardContent>
                    {children}
                </CardContent>
            }
        </Card>
    )
}