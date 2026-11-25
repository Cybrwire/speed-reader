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
    
    const [showText, setShowText] = useState(false);
    const [stop, setStop] = useState(false);
    const currWord = useWordFlash(playing, setPlaying, stop, setStop, settings.speed,result.tokens, settings.tokenChunkSize);

    const readStyle: Record<Mode, string> = {
        paragraph: "",
        focused: "text-center",
    };

    const activeMode: Mode = showText ? "paragraph" : settings.mode;


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
                    <h3 className="text-2xl">Reading Area</h3>
                    <span>{playing ? "Playing" : "Paused"}</span>
                    <div className="flex items-center">
                        <Button variant='show-hide' onClick={()=>toggleshowText()} >{showText ?  <OpenEye/> : <ClosedEye/>}</Button>
                        <Button variant='play-pause' onClick={()=>toggleSpeedRead()} disabled={showText}>{playing ? <PauseIcon/> : <PlayIcon/>}</Button>
                        <Button variant='stop' onClick={()=>setStop(true)}>◾️</Button >
                    </div>
                </div>
                <div className={`border h-64 overflow-x-auto ${readStyle[activeMode]}`} style={{ fontSize: `${settings.fontSize}px`, writingMode: `${settings.orientation}` }}>
                        {result.tokens.map((token,i) => (
                            <Word key={i} isCurrent={i === currWord} showText ={showText} word={token} mode={activeMode} showFurigana={settings.showFurigana} />
                        ))}
                </div>
            </section>
    )
}