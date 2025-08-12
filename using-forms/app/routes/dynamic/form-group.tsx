import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import FormActions from "~/components/app/form-actions"
import CustomTextInput from "~/components/custom/custom-text-input"
import { Form } from "~/components/ui/form"
import { useFormResult } from "~/lib/context/form-result-context"
import { useSubTitle } from "~/lib/context/sub-title-context"

const FormSchema = z.object({
    name : z.string().nonempty("Please enter name."),
    contact : z.object({
        phone : z.string().nonempty("Please enter phone number."),
        email: z.string().nonempty("Please enter email.")
    })
})

type FormType = z.infer<typeof FormSchema>

export default function DynamicFormGroup() {

    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Dynamic Form Group"), [setTitle])

    const {setResult} = useFormResult()
    useEffect(setResult, [])

    const form = useForm<FormType>({
        resolver : zodResolver(FormSchema),
        defaultValues: {
            name: "",
            contact: {
                phone: "",
                email: ""
            }
        }
    })

    const saveAction = (form: FormType) => setResult(JSON.stringify(form, null, 2))
    const clearAction = () => {
        form.reset()
        setResult()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(saveAction)}>
                <CustomTextInput control={form.control} path="name" label="Name" className="mb-3" />
                <CustomTextInput control={form.control} path="contact.phone" label="Phone" type="tel" className="mb-3" />
                <CustomTextInput control={form.control} path="contact.email" label="Email" type="email" className="mb-3" />

                <FormActions clear={clearAction} />
            </form>
        </Form>
    )
}