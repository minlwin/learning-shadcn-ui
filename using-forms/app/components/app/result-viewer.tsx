import { useFormResult } from "~/lib/context/form-result-context"

export default function FormResultViewer() {

    const {result} = useFormResult()

    return (
        result && 
            <pre className="p-8 bg-black font-mono text-white rounded-md shadow">{result}</pre>      
    )
}