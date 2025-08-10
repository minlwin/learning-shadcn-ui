import type { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

export type CustomDateInputProp<T extends FieldValues> = {
    control : Control<T>
    path : Path<T>
    label : string
    className? : string
    inputWidth? : string
    min? : Date
    max? : Date
}

export default function CustomDateInput<T extends FieldValues>({
    control, 
    path,
    label,
    className,
    inputWidth,
    min,
    max
} : CustomDateInputProp<T>) {

    const display = (value? : Date) => value ? format(value, "PPP") : "Pick a date"

    const isDisabled = (value : Date) => {
        return (value < (min || new Date('1900-01-01'))) || (value > (max || new Date))
    }

    return (
        <FormField control={control} name={path} render={({field}) => 
            <FormItem className={className}>
                <FormLabel>{label}</FormLabel>
                <Popover>
                    <PopoverTrigger asChild>
                        <FormControl>
                            <Button className={`block px-3 ${inputWidth || 'w-full'}`} variant={'outline'}>
                                <div className="flex justify-between">
                                    <span>{display(field.value)}</span>
                                    <CalendarIcon />
                                </div>
                            </Button>
                        </FormControl>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Calendar 
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={isDisabled}
                            captionLayout="dropdown" />
                    </PopoverContent>
                </Popover>
                <FormMessage />
            </FormItem>
        } />
    )
}