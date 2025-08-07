import type { Control, FieldValues, Path } from "react-hook-form";
import type { Option } from "~/lib/types";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export type CustomRadioGroupProps<T extends FieldValues> = {
    control : Control<T>
    path : Path<T>
    items : Option[]
    label? : string
    className? : string
    description? : string
}

export default function CustomRadioGroup<T extends FieldValues>({
    control,
    path,
    items,
    label,
    className,
    description
} : CustomRadioGroupProps<T>) {
    return (
        <FormField control={control} name={path} render={({field}) => 
            <FormItem className={className}>
                {label && <FormLabel>{label}</FormLabel>}
                {description && <FormDescription className="mb-2">{description}</FormDescription>}
                <FormControl>
                    <RadioGroup value={field.value} onValueChange={field.onChange} className="flex flex-col">
                        {items.map(option => 
                            <FormItem key={option.id} className="flex gap-2">
                                <FormControl>
                                    <RadioGroupItem value={option.id} />
                                </FormControl>
                                <FormLabel>{option.value}</FormLabel>
                            </FormItem>
                        )}
                    </RadioGroup>
                </FormControl>
                <FormMessage />
            </FormItem>
        } />
    )
}