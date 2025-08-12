import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@radix-ui/react-label"
import { Minus, Plus, Save, Trash } from "lucide-react"
import { useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import z from "zod"
import CustomTextInput from "~/components/custom/custom-text-input"
import { Button } from "~/components/ui/button"
import { Form } from "~/components/ui/form"
import { useFormResult } from "~/lib/context/form-result-context"
import { useSubTitle } from "~/lib/context/sub-title-context"

const FormSchema = z.object({
    name : z.string().nonempty("Please enter name."),
    properties : z.array(z.object({
        key: z.string().nonempty("Please enter key."),
        value : z.string().nonempty("Please enter value.")
    }))
})

type FormType = z.infer<typeof FormSchema>

export default function DynamicFormItem() {

    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Dynamic Form Field"), [setTitle])

    const {setResult} = useFormResult()
    useEffect(setResult, [])

    const form = useForm<FormType>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            properties: [
                {key : "", value : ""}
            ]
        }
    })

    const saveAction = (form: FormType) => setResult(JSON.stringify(form, null, 2))
    const clearAction = () => {
        form.reset()
        setResult()
    }

    const {fields, append, remove} = useFieldArray({
        control: form.control,
        name: 'properties'
    })

    const addProperties = () => append({key : "", value : ""})
    
    const removeProperties = (index : number) => {
        remove(index)
        if(form.watch("properties").length == 0) {
            append({key : "", value : ""})
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(saveAction)}>
                <CustomTextInput control={form.control} path="name" label="Name" className="mb-3" />

                <div className="grid grid-cols-3 gap-y-2 gap-x-4 mb-4">
                    <Label>Key</Label>
                    <Label className="col-span-2">Value</Label>

                    {fields.map((item, index) => 
                        <>
                            <CustomTextInput key={`key-${item.id}`} control={form.control} 
                                path={`properties.${index}.key`} placeholder="Enter Key" />  
                            <div className="col-span-2 flex gap-2" key={`value-${item.id}`} >
                                <CustomTextInput control={form.control} className="flex-1"
                                    path={`properties.${index}.value`} placeholder="Enter Value"  />  
                                <Button variant='destructive' type="button" onClick={() => removeProperties(index)}>
                                    <Minus />
                                </Button> 
                            </div> 
                        </>
                    )}
                </div>

                <div>
                    <Button type="button" variant='outline' onClick={addProperties}>
                        <Plus /> Add Property
                    </Button>

                    <Button type="button" variant='outline' onClick={clearAction} className="ms-2">
                        <Trash /> Clear
                    </Button>

                    <Button type="submit" className="ms-2">
                        <Save /> Save
                    </Button>
                </div>

            </form>
        </Form>
    )
}