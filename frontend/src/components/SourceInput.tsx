export function SourceInput() {
    return (
        <div className="m-2">
            <form className='flex flex-col items-center'action="/post">
                <label htmlFor="textInput">Sentence to speed read:</label>
                <input type="text" name="textInput" id="textInput" placeholder="Enter your text here..."
                className="w-fit p-2 field-sizing-content" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}