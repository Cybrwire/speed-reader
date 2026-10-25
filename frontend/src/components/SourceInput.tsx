import {useState, type SubmitEvent} from "react";

type SourceInputProps = {
    onSubmit: (text: string) => void;
    error: string | null;
};

export function SourceInput({ onSubmit, error }: SourceInputProps) {
    const [text,setText] = useState<string>('');
    
    async function handleFormSubmit(e:SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        onSubmit(text);
    }

    return (
        <div className="m-2">
            <form className='flex flex-col items-center' onSubmit={handleFormSubmit}>
                <label htmlFor="textInput">Sentence to speed read:</label>
                <input type="text" name="textInput" id="textInput" placeholder="Enter your text here..."
                value={text} onChange={e => setText(e.target.value)}
                className="w-fit p-2 m-2 border-2 field-sizing-content" />
                <button type="submit" className="border-2 p-2 rounded-lg cursor-pointer" disabled={text.trim()===''}>Submit</button>
                {error && <p className="text-red-600">{error}</p>}
            </form>
        </div>
    )
}