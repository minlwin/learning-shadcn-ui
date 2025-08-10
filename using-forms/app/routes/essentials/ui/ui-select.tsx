import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react"
import { useForm } from "react-hook-form";
import z from "zod";
import FormActions from "~/components/app/form-actions";
import CustomDateInput from "~/components/custom/custom-date-input";
import CustomSelect from "~/components/custom/custom-select";
import CustomTextInput from "~/components/custom/custom-text-input";
import CustomTextarea from "~/components/custom/custom-textarea";
import { Form, FormControl } from "~/components/ui/form";
import { useFormResult } from "~/lib/context/form-result-context"
import { useSubTitle } from "~/lib/context/sub-title-context"

export function meta() {
  return [
    { title: "Using Form | UI Selects" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const FormSchema = z.object({
    name: z.string().nonempty("Please enter name."),
    level: z.string().nonempty("Please select level."),
    from : z.date("Please select from date."),
    to: z.date("Please select to date."),
    description: z.string()
})

type FormType = z.infer<typeof FormSchema>

export default function UiSelect() {
    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Hook Form with UI Select"), [setTitle])

    const {setResult} = useFormResult()
    useEffect(setResult, [])

    const form = useForm<FormType>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            level: '',
            from: undefined,
            to: undefined,
            description: ''
        }
    })

    const saveAction = (form: FormType) => setResult(JSON.stringify(form, null, 2))
    const clearAction = () => {
        form.reset()
        setResult()
    }
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(saveAction)} className="grid row-cols-2 gap-4">
                <CustomTextInput control={form.control} path="name"
                    label="Name" className="col-span-2"/>

                <CustomSelect control={form.control} path="level"
                    label="Level" className="col-span-2" 
                    options={["Basic", "Intermediate", "Advance"].map(a => ({value: a, label: a}))} />

                <CustomDateInput control={form.control} path="from" 
                    label="Date From" />

                <CustomDateInput control={form.control} path="to" 
                    label="Date To" />

                <CustomTextarea control={form.control} path="description"
                    label="Description" className="col-span-2" />

                <FormActions clear={clearAction} />        
            </form>
            
        </Form>
    )
}