import { Button } from "./Button"
import { OpenEye, PlayIcon, PauseIcon} from "./icons"
import { type ParsedResponse } from "../../../server/src/ichiran.types.jsx"
import type { Settings, Mode } from "./types.js";
import Word from "./Word.js";
import { useWordFlash } from "../hooks/useWordFlash.ts";


type ReadingAreaProps = {
    result: ParsedResponse | null;
    settings: Settings;
    playing: boolean;
    setPlaying: (playing: boolean) => void;
};


export function ReadingArea({ playing, setPlaying, result, settings }:ReadingAreaProps) {
    
    const cWord = useWordFlash(playing, settings.speed,result.tokens.length, setPlaying);
    const containerStyle: Record<Mode, string> = {
        paragraph: "",
        focused: "text-center",
    };

    if (!result) return;
    console.log(result);
    return (
            <section className="flex flex-col border-2 p-2">
                <div className="flex items-center justify-between"> 
                    <h3 className="text-2xl">Reading Area</h3><span>{playing ? "Playing" : "Paused"}</span>
                    <div>
                        <Button variant='show-hide' ><OpenEye/></Button>
                        <Button variant='show-hide' onClick={()=>setPlaying(!playing)} >{playing ? <PauseIcon/> : <PlayIcon/>}</Button>
                    </div>
                </div>
                <div className={`border ${containerStyle[settings.mode]}`} style={{ fontSize: `${settings.fontSize}px` }}>
                        {result.tokens.map((token,i) => (
                            <Word key={i} isCurrent={i === cWord} word={token} mode={settings.mode} showFurigana={settings.showFurigana} />
                        ))}
                </div>
            </section>
    )
}