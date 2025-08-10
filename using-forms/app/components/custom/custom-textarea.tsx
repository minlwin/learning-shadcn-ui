import type { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";

export type CustomTextareaProps<T extends FieldValues> = {
    control : Control<T>
    path: Path<T>
    label?: string
    className? : string
}

export default function CustomTextarea<T extends FieldValues>({
    control, path, label, className
} : CustomTextareaProps<T>) {
    return (
        <FormField control={control} name={path} render={({field}) => 
            <FormItem className={className}>
                {label && <FormLabel>{label}</FormLabel>}
                <FormControl>
                    <Textarea {...field} placeholder={label && `Enter ${label}`} />
                </FormControl>
                <FormMessage />
            </FormItem>
        }/>   
    )
}