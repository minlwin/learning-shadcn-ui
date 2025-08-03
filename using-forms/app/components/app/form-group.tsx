import type React from "react";

export default function FormGroup({label, children, className} : {
    label : string,
    children : React.ReactNode,
    className? : string
}) {
    return (
        <div className={className}>
            <label className="block mb-2 text-sm">{label}</label>
            {children}
        </div>
    )
}