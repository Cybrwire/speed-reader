import React, { useState } from "react";

export function ControlPanel() {
    const [collapse, setCollapse] = useState(false);
        
    return (
        <aside className={`grid grid-cols-2 ${collapse ? "translate-x-[50%]" : ""}`}>
            <button onClick={() => setCollapse(!collapse)} className="border border-r-0 rounded-bl-lg rounded-tl-lg p-1 cursor-pointer w-fit h-13 justify-self-end">Tap</button>
            <div className="border border-r-0 p-2">
                <fieldset>
                    <legend>Reader Controls</legend>
                    <label htmlFor="speed">Speed </label>
                    <input className='border'type="number" name="speed" id="speed" />
                </fieldset>

            </div>
        </aside>
    )
}