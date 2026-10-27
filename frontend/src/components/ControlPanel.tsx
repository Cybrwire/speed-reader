import { useState } from "react";
import type { Settings } from "./types";

type ControlPanelProps = {
    settings: Settings;
    onSettingsChange: (changes: Partial<Settings>) => void;
}

export function ControlPanel({settings, onSettingsChange}: ControlPanelProps) {
    const [collapse, setCollapse] = useState(false);
        
    return (
        <aside className={`grid grid-cols-2 ${collapse ? "translate-x-[50%]" : ""}`}>
            <button onClick={() => setCollapse(!collapse)} className="border border-r-0 rounded-bl-lg rounded-tl-lg p-1 cursor-pointer w-fit h-13 justify-self-end">Tap</button>
            <div className="border border-r-0 p-2">
                <fieldset>
                    <legend>Reader Controls</legend>
                    <label htmlFor="speed">Speed:</label>
                    <input value={settings.speed} 
                    onChange={(e) => onSettingsChange({ speed: Number(e.target.value) })} className='border'type="number" id="speed" 
                    />
                    <label htmlFor="showFurigana">Show Furigana:</label>
                    <input checked={settings.showFurigana}
                    onChange={(e) => onSettingsChange({ showFurigana: e.target.checked })} type="checkbox" id="showFurigana" 
                    />
                    <label htmlFor="fontSize" className="block">Font Size:</label>
                    <input value={settings.fontSize} className="field-sizing-content min-w-[6ch]"
                    onChange={(e) => onSettingsChange({ fontSize: Number(e.target.value) })} type="number" id="fontSize" 
                    />
                    <fieldset className="border-0 p-0">
                        <legend>Read Mode</legend>
                        <input checked={settings.mode === "paragraph"} onChange={() => onSettingsChange({ mode: "paragraph" })} type="radio" name="readMode" id="modeParagraph" />
                        <label htmlFor="modeParagraph">Paragraph</label>
                        <input checked={settings.mode === "focused"} onChange={() => onSettingsChange({ mode: "focused" })} type="radio" name="readMode" id="modeFocused" />
                        <label htmlFor="modeFocused">Focused</label>
                    </fieldset>
                </fieldset>

            </div>
        </aside>
    )
}