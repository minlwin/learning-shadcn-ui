import { zodResolver } from "@hookform/resolvers/zod"
import { Minus, Plus, Save, Trash } from "lucide-react"
import { useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import z from "zod"
import CustomSelect from "~/components/custom/custom-select"
import CustomTextInput from "~/components/custom/custom-text-input"
import { Button } from "~/components/ui/button"
import { Form } from "~/components/ui/form"
import { Label } from "~/components/ui/label"
import { useFormResult } from "~/lib/context/form-result-context"
import { useSubTitle } from "~/lib/context/sub-title-context"

const FormSchema = z.object({
    name: z.string().nonempty("Please enter product name."),
    category: z.string().nonempty("Please select category."),
    sizes: z.array(z.object({
        value : z.string().nonempty("Please enter size.")
    }))
})

type FormType = z.infer<typeof FormSchema>

export default function DynamicFormArray() {

    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Dynamic Form Array"), [setTitle])

    const {setResult} = useFormResult()
    useEffect(setResult, [])

    const form = useForm<FormType>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
            category: '',
            sizes: [{value: ''}]
        }
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'sizes'
    })

    const saveAction = (form: FormType) => {
        const result = {...form, sizes: form.sizes.map(a => a.value)}
        setResult(JSON.stringify(result, null, 2))
    }
    const clearAction = () => {
        form.reset()
        setResult()
    }

    const addSize = () => append({value : ""})

    const removeSize = (index:number) => {
        remove(index) 
        if(form.watch('sizes').length == 0) {
            append({value : ""})
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(saveAction)}>

                <div className="mb-4">
                    <div className="grid grid-cols-3 gap-4 mb-3">
                        <CustomSelect control={form.control} path="category"
                            label="Category" options={["Foods", "Drinks", "Snaks"].map(a => ({label: a, value: a}))} />

                        <CustomTextInput control={form.control} path="name" 
                            label="Product Name" className="col-span-2" />
                    </div>

                    <div className="mb-3">
                        <Label className="mb-2">Sizes</Label>

                        { fields.map((field, index) => 
                            <div className="mb-2 flex gap-2" key={field.id}>
                                <CustomTextInput className="flex-1" control={form.control} 
                                    path={`sizes.${index}.value`} placeholder="Enter Size" />
                                <Button onClick={() => removeSize(index)} type="button" variant='outline'>
                                    <Minus />
                                </Button>
                            </div>
                        ) }
                    </div>

                    <div>
                        <Button onClick={addSize} type="button" variant='outline'>
                            <Plus /> Add Size
                        </Button>

                        <Button onClick={clearAction} type="button" className="ms-2" variant='outline'>
                            <Trash /> Clear
                        </Button>

                        <Button className="ms-2" type="submit" >
                            <Save /> Save
                        </Button>
                    </div>

                </div>


            </form>
        </Form>
    )
}