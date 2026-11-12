import { Button } from "./Button"
import { OpenEye, PlayIcon, PauseIcon, ClosedEye} from "./icons"
import { type ParsedResponse } from "../../../server/src/ichiran.types.jsx"
import type { Settings, Mode } from "./types.js";
import Word from "./Word.js";
import { useWordFlash } from "../hooks/useWordFlash.ts";
import { useState } from "react";


type ReadingAreaProps = {
    result: ParsedResponse;
    settings: Settings;
    playing: boolean;
    setPlaying: (playing: boolean) => void;
};


export function ReadingArea({ playing, setPlaying, result, settings }:ReadingAreaProps) {
    
    const cWord = useWordFlash(playing, settings.speed,result.tokens, setPlaying);
    const containerStyle: Record<Mode, string> = {
        paragraph: "",
        focused: "text-center",
    };
    const [showText, setShowText] = useState(false);
    const displayMode: Mode = showText ? "paragraph" : settings.mode;
    function toggleshowText(){
        setShowText(!showText);
    }

    function toggleSpeedRead(){
        setPlaying(!playing);
        
    }
    console.log(result);
    return (
            <section className="flex flex-col border-2 p-2">
                <div className="flex items-center justify-between"> 
                    <h3 className="text-2xl">Reading Area</h3><span>{playing ? "Playing" : "Paused"}</span>
                    <div>
                        <Button variant='show-hide' onClick={()=>toggleshowText()} >{showText ?  <OpenEye/> : <ClosedEye/>}</Button>
                        <Button disabled={showText} variant='play-pause' onClick={()=>toggleSpeedRead()} >{playing ? <PauseIcon/> : <PlayIcon/>}</Button>
                    </div>
                </div>
                <div className={`border ${containerStyle[displayMode]}`} style={{ fontSize: `${settings.fontSize}px` }}>
                        {result.tokens.map((token,i) => (
                            <Word key={i} isCurrent={i === cWord} showText ={showText} word={token} mode={displayMode} showFurigana={settings.showFurigana} />
                        ))}
                </div>
            </section>
    )
}