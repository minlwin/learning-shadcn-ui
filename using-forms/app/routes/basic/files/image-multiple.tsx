import { zodResolver } from "@hookform/resolvers/zod";
import { Image, Save, Trash2 } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { useForm } from "react-hook-form";
import z, { file } from "zod";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useFormResult } from "~/lib/context/form-result-context";
import { useSubTitle } from "~/lib/context/sub-title-context"

export function meta() {
  return [
    { title: "Using Form | Multiple Images" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const FormSchema = z.object({
    file: z.array(z.file()).nonempty()
})

type FormType = z.infer<typeof FormSchema>

export default function MultipleImages() {
    const {setTitle} = useSubTitle()
    useEffect(() => setTitle("Multiple Image File"), [setTitle])

    const {setResult} = useFormResult()
    useEffect(() => setResult(), [setResult])
    
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    
    const {setValue, reset, handleSubmit, formState: {
        isValid
    }} = useForm<FormType>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            file: undefined
        }
    })

    const [images, setImages] = useState<File[]>([])

    const saveAction = (form: FormType) => setResult(JSON.stringify({file : form.file.map(a => a.name)}, null, 2))
    const clearAction = () => {
        reset()
        setResult()
        setImages([])
    }

    const changeImage = (e : ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files
        const fileArray = fileList ? Array.from(fileList) : []

        setValue('file', fileArray, {
            shouldValidate : true
        })

        setImages(fileArray)
    }

    return (
        <form onSubmit={handleSubmit(saveAction)}>

            <input ref={fileInputRef} multiple onChange={changeImage} type="file" className="hidden" />

            <section className="mb-4">
                <ImageViewer files={images} />
            </section>

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

function ImageViewer({files} : {files : File[]}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent>
                {files.length ? 
                    <div className="grid grid-cols-2 gap-4">
                        {files.map((file, index) => 
                            <img key={index} src={URL.createObjectURL(file)}  />
                        )}
                    </div> :
                    <span>Select Images ...</span> 
                }
            </CardContent>
        </Card>
    )
}