import type { Control, ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import type { Option } from "~/lib/types";
import { Checkbox } from "../ui/checkbox";
import type { CheckedState } from "@radix-ui/react-checkbox";

export type CustomCheckBoxGroupProp<T extends FieldValues> = {
    control : Control<T>
    path : Path<T>
    label : string
    items : Option[]
    orientation? : "vertical" | "horizontal",
    className?: string
}

export default function CustomCheckBoxGroup<T extends FieldValues>({
    control,
    path,
    label,
    items,
    className,
    orientation
} : CustomCheckBoxGroupProp<T>)  {

    const isChecked = (id: string, value? : string[]) => {
        if(value) {
            return value.includes(id)
        }
        return false
    }

    const onCheckChange =  (checked:CheckedState, id: string, field:ControllerRenderProps<T, Path<T>>) => {
        field.onChange(checked ? [...field.value, id] : field.value?.filter((item: string) => item != id))
    }

    return (
        <FormField control={control} name={path} render={() => 
            <FormItem className={className}>
                <FormLabel className="mb-2">{label}</FormLabel>
                <div className={`flex ${orientation != 'horizontal' ? 'flex-col gap-2' : 'gap-4'} `} >
                    {items.map(option => 
                        <FormField key={option.id} control={control} name={path} render={({field}) => 
                            <FormItem className="flex gap-2">
                                <FormControl>
                                    <Checkbox 
                                        checked={isChecked(option.id, field.value)} 
                                        onCheckedChange={checked => onCheckChange(checked, option.id, field)} />
                                </FormControl>
                                <FormLabel>{option.value}</FormLabel>
                            </FormItem>
                        }/>
                    )}
                </div>
                <FormMessage />
            </FormItem>
        } />
    ) 
}