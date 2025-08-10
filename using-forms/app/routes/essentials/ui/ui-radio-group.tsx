import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import FormActions from "~/components/app/form-actions"
import CustomRadioGroup from "~/components/custom/custom-radio-group"
import { Form } from "~/components/ui/form"
import { SUBJECTS } from "~/lib/consts"
import { useFormResult } from "~/lib/context/form-result-context"
import { useSubTitle } from "~/lib/context/sub-title-context"

export function meta() {
  return [
    { title: "Using Form | UI Radios" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const FormSchema = z.object({
    subject : z.string().nonempty("Please select subject.")
})

type FormType = z.infer<typeof FormSchema>

export default function UiRadioGroup() {
    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Hook Form with UI Radio Group"), [setTitle])

    const {setResult} = useFormResult()
    useEffect(setResult, [])

    const form = useForm<FormType>({
        resolver: zodResolver(FormSchema),
        defaultValues : {
            subject: ""
        }
    })

    const clear = () => {
        form.reset()
        setResult()
    }

    const saveAction = (form:FormType) => {
        setResult(JSON.stringify(form, null, 2))
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(saveAction)}>
                <CustomRadioGroup control={form.control} path="subject" className="mb-4"
                    items={SUBJECTS} label="Subject" description="Select one subject..." />

                <FormActions clear={clear} />
            </form>
        </Form>
    )
}