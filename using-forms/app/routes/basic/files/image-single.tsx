import { zodResolver } from "@hookform/resolvers/zod";
import { Image, Save, Trash2 } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useFormResult } from "~/lib/context/form-result-context";
import { useSubTitle } from "~/lib/context/sub-title-context"

export function meta() {
  return [
    { title: "Using Form | Single Image" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const FormSchema = z.object({
    file: z.file().nonoptional()
})

type FormType = z.infer<typeof FormSchema>

export default function SingleImage() {
    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Single Image File"), [setTitle])

    const {setResult} = useFormResult()
    useEffect(() => setResult(), [setResult])

    const {setValue, reset, handleSubmit, formState : {
        isValid
    }} = useForm<FormType>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            file: undefined
        }
    })

    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const saveAction = (form: FormType) => setResult(JSON.stringify({file : form.file.name}, null, 2))
    const clearAction = () => {
        reset()
        setResult()
        setImage(undefined)
    }

    const [image, setImage] = useState<File>()
    const changeImage = (e : ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        setImage(selectedFile)
        if(selectedFile) {
            setValue('file', selectedFile, {
                shouldValidate : true
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(saveAction)}>
            <section className="mb-4">
                <ImageViewer file={image} />
            </section>

            <input ref={fileInputRef} onChange={changeImage} type="file" className="hidden" />

            <div>
                <Button type="button" onClick={() => fileInputRef.current?.click()}>
                    <Image /> Select Image
                </Button>

                <Button type="button" onClick={clearAction} disabled={!isValid} className="ms-2">
                    <Trash2 /> Clear
                </Button>

                <Button type="submit" disabled={!isValid} className="ms-2">
                    <Save /> Save
                </Button>
            </div>
        </form>
    )
}

function ImageViewer({file} : {file? : File}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Image</CardTitle>
            </CardHeader>
            <CardContent>
                {file ? 
                    <img src={URL.createObjectURL(file)} /> :
                    <span>Please select Image</span>}
            </CardContent>
        </Card>
    )
}