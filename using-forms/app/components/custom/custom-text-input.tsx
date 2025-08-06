import type { Control, FieldValues, Path } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import type React from "react"

export type CustomTextInputProps<T extends FieldValues> = {
    label : string
    control : Control<T>
    path : Path<T>
    className? : string,
    placeholder? : string,
    type? : React.HTMLInputTypeAttribute
}

export default function CustomTextInput<T extends FieldValues>({
    label,
    control,
    path,
    className,
    placeholder,
    type
} : CustomTextInputProps<T>) {
    return (
        <FormField control={control} name={path} render={({field}) => 
            <FormItem className={className}>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Input {...field} type={type} placeholder={placeholder ? placeholder : `Enter ${label}.`} />
                </FormControl>
                <FormMessage />
            </FormItem>
        } />
    )
}