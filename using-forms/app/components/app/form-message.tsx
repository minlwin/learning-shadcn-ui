export default function FormMessage({message} : {message : string}) {
    return (
        <div className="text-sm text-red-500">{message}</div>
    )
}