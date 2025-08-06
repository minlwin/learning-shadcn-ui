import type { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { cn } from "~/lib/utils";

export type CustomCheckBoxProp<T extends FieldValues> = {
    control : Control<T>
    path : Path<T>
    label : string
    className? : string
}

export default function CustomCheckBox<T extends FieldValues>({
    control,
    path,
    label,
    className
} : CustomCheckBoxProp<T>) {
    return (
        <FormField control={control} name={path} render={({field}) => 
            <FormItem className={cn('flex flex-row items-center gap-2', className)}>
                <FormControl>
                    <Checkbox {...field} value={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>{label}</FormLabel>
            </FormItem>
        } />
    )
}