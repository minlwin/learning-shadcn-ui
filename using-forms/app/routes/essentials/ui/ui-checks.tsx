import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import FormActions from "~/components/app/form-actions"
import CustomCheckBox from "~/components/custom/custom-checkbox"
import CustomCheckBoxGroup from "~/components/custom/custom-checkbox-group"
import { Form } from "~/components/ui/form"
import { SUBJECTS } from "~/lib/consts"
import { useFormResult } from "~/lib/context/form-result-context"
import { useSubTitle } from "~/lib/context/sub-title-context"

export function meta() {
  return [
    { title: "Using Form | UI Checks" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const FormSchema = z.object({
    subjects : z.array(z.string()).nonempty("Please enter subjects."),
    accept : z.boolean()
})

type FormType = z.infer<typeof FormSchema>

export default function UiChecks() {
    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Hook Form with UI Checks"), [setTitle])

    const {setResult} = useFormResult()
    useEffect(setResult, [])

    const form = useForm<FormType>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            subjects : [],
            accept: false
        }
    })

    const saveAction = (form: FormType) => {
        setResult(JSON.stringify(form, null, 2))
    }

    const clear = () => {
        form.reset()
        setResult()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(saveAction)}>

                <CustomCheckBoxGroup control={form.control} 
                    path="subjects" label="Subjects" items={SUBJECTS} className="mb-5" />

                <CustomCheckBox control={form.control} path="accept" label="Accept" className="mb-5" />      

                <FormActions clear={clear} />
            </form>
        </Form>
    )
}