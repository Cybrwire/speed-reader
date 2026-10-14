export function ControlPanel() {
    return (
        <aside className="border grid grid-cols-2">
            <button className="border">Tap</button>
            <div className="border">
                <fieldset>
                    <legend>Reader Controls</legend>
                    <label htmlFor="speed">Speed </label>
                    <input type="number" name="speed" id="speed" />
                </fieldset>

                <fieldset>
                    <label htmlFor="text-orientation">Text Orientation</label>
                    <input type="radio" name="horizontal" id="text-orientation" value='horizontal' checked/>
                    <input type="radio" name="vertical" id="text-orientation" value='Vertical'/>
                </fieldset>
            </div>
        </aside>
    )
}