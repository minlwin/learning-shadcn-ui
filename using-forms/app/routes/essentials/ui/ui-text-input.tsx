import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import FormActions from "~/components/app/form-actions"
import CustomCheckBox from "~/components/custom/custom-checkbox"
import CustomTextInput from "~/components/custom/custom-text-input"
import { Form } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { useFormResult } from "~/lib/context/form-result-context"
import { useSubTitle } from "~/lib/context/sub-title-context"

const FormSchema = z.object({
    name : z.string()
        .nonempty("Please enter name."),
    phone : z.string()
        .nonempty("Please enter phone number.")
        .regex(z.regexes.number, "Phone number must contains only digits."),
    email : z.string()
        .nonempty("Please enter email")
        .regex(z.regexes.email, "Invalid email address."),
    password : z.string()
        .nonempty("Please enter password.")
        .min(6, "Password must be 6 to 8 characters.")
        .max(8, "Password must be 6 to 8 characters."),
    subscribe : z.boolean()
})

type FormType = z.infer<typeof FormSchema>

export default function UiTextInput() {
    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Hook form with UI Input"), [setTitle])

    const {setResult} = useFormResult()
    useEffect(setResult, [])

    const form = useForm<FormType>({
        resolver : zodResolver(FormSchema),
        defaultValues : {
            name: '',
            phone: '',
            email : '',
            password: '',
            subscribe: false
        }
    })

    const saveAction = (form: FormType) => setResult(JSON.stringify(form, null, 2))
    const clear = () => {
        form.reset()
        setResult()
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(saveAction)}>
                
                <CustomTextInput control={form.control} path="name" 
                    label="Name" className="mb-3" />

                <CustomTextInput control={form.control} path="phone" type="tel" 
                    label="Phone" className="mb-3" />

                <CustomTextInput control={form.control} path="email" type="email" 
                    label="Email" className="mb-3" />

                <CustomTextInput control={form.control} path="password" type="password" 
                    label="Password" className="mb-3" />

                <CustomCheckBox control={form.control} path="subscribe" 
                    label="Subscribe" className="mb-3" />

                <FormActions clear={clear} /> 
            </form>
        </Form>
    )
}