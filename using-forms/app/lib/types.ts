import type { LucideProps } from "lucide-react";

export type Title = {
    label: string
    icon?: IconType
}

export type IconType = React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>

export type Option = {
    id: string
    value: string
}