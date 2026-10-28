import { Button } from "./Button"
import { OpenEye, PlayIcon, PauseIcon} from "./icons"
import { type ParsedResponse } from "../../../server/src/ichiran.types.jsx"
import type { Settings } from "./types.js";
import Word from "./Word.js";


type ReadingAreaProps = {
    result: ParsedResponse | null;
    settings: Settings;
    playing: boolean;
    setPlaying: (playing: boolean) => void;
};

export function ReadingArea({ playing, setPlaying, result, settings }:ReadingAreaProps) {
    
    if (!result) return;
    //console.log(result);
    return (
            <section className="flex flex-col border-2 p-2">
                <div className="flex items-center justify-between"> 
                    <h3 className="text-2xl">Reading Area</h3><span>{playing ? "Playing" : "Paused"}</span>
                    <div>
                        <Button variant='show-hide' ><OpenEye/></Button>
                        <Button variant='show-hide' onClick={()=>setPlaying(!playing)} >{playing ? <PauseIcon/> : <PlayIcon/>}</Button>
                    </div>
                </div>
                <div className="border" style={{ fontSize: `${settings.fontSize}px` }}>
                        {result.tokens.map((token,i) => (
                            <Word key={i} word={token} isCurrent={false} showFurigana={settings.showFurigana} />
                        ))}
                </div>
            </section>
    )
}