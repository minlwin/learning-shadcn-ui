import { zodResolver } from "@hookform/resolvers/zod";
import { FolderOpen, Save, Trash2 } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useFormResult } from "~/lib/context/form-result-context";
import { useSubTitle } from "~/lib/context/sub-title-context"

export function meta() {
  return [
    { title: "Using Form | Text File" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const FormSchema = z.object({
    file: z.file().nonoptional("Please select file.")
})

type FormType = z.infer<typeof FormSchema>

export default function TestFile() {
    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Test File Input"), [setTitle])

    const {setResult} = useFormResult()
    useEffect(() => setResult(), [setResult])
    
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [content, setContent] = useState<string>()

    const {setValue, handleSubmit, reset, formState: {
        isValid
    }} = useForm<FormType>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            file: undefined
        }
    })

    const saveAction = (form: FormType) => setResult(JSON.stringify({file: form.file.name}, null, 2))
    const clearAction = () => {
        reset()
        setResult()
        setContent(undefined)
    }

    const changeFile = (event : ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if(file) {
            setContent(undefined)
            const reader = new FileReader
            setValue('file', file, {
                shouldValidate: true
            })

            reader.onload = () => {
                setContent(reader.result as string)
            }

            reader.readAsText(file)
        }
    }

    return (
        <form onSubmit={handleSubmit(saveAction)}>

            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>File Contents</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre>
                        {content || 'Please select file ...'}
                    </pre>
                </CardContent>
            </Card>

            <input
                className="hidden"
                type="file"
                ref={fileInputRef}
                onChange={changeFile}
            />

            <div>
                <Button type="button" onClick={() => fileInputRef.current?.click()}>
                    <FolderOpen /> Select File
                </Button>

                <Button type="button" disabled={!isValid} className="ms-2" onClick={clearAction}>
                    <Trash2 /> Clear
                </Button>

                <Button type="submit" disabled={!isValid} className="ms-2">
                    <Save /> Save
                </Button>
            </div>
        </form>
    )
}