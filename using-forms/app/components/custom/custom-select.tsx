import type { FieldValues, Control, Path } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Select, SelectContent, SelectItem, SelectValue } from "../ui/select"
import { SelectTrigger } from "@radix-ui/react-select"

export type Option = {
    value : string
    label : string
}

export type CustomSelectProps<T extends FieldValues> = {
    control : Control<T>
    path : Path<T>
    label ?: string
    options : Option[]
    className? : string,
    placeholder? : string,
}

export default function CustomSelect<T extends FieldValues>({
    control,
    path,
    label,
    options,
    className,
    placeholder
} : CustomSelectProps<T>) {
    return (
        <FormField control={control} name={path} render={({field}) => 
            <FormItem className={className}>
                {label && <FormLabel>{label}</FormLabel>}
                <Select value={field.value} onValueChange={field.onChange}  >
                    <FormControl>
                        <SelectTrigger id={path}>
                            <SelectValue placeholder={placeholder ? placeholder : "Select One"} />
                        </SelectTrigger>
                    </FormControl>
                </Select>
                <SelectContent>
                {options.map(option => 
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                )}
                </SelectContent>
                <FormMessage />
            </FormItem>
        } />
    )
}