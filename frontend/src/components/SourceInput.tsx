import {useState, type SubmitEvent} from "react";
import type { ParseResponse } from "../../../server/src/ichiran.types";

type SourceInputProps = {
    onResult: (data: ParseResponse) => void;
};

export function SourceInput({ onResult }: SourceInputProps) {
    const [text,setText] = useState<string>('');
    const [err,setError] = useState<string | null>(null);

    const [loading,setLoading] = useState(false);
    


    async function handleSubmit(e:SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try{
            const res = await fetch("http://localhost:3000/api/parse", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sentence: text }),
            });
            const data = await res.json();
            onResult(data);
            
        }catch(err){
            setError(err instanceof Error ? err.message : "Unknown error");
        }finally{
            setLoading(false);
        }   

    }

    return (
        <div className="m-2">
            <form className='flex flex-col items-center' onSubmit={handleSubmit}>
                <label htmlFor="textInput">Sentence to speed read:</label>
                <input type="text" name="textInput" id="textInput" placeholder="Enter your text here..."
                value={text} onChange={e => setText(e.target.value)}
                className="w-fit p-2 m-2 border-2 field-sizing-content" />
                <button type="submit" className="border-2 p-2 rounded-lg cursor-pointer" disabled={text.trim()===''}>Submit</button>
            </form>
        </div>
    )
}