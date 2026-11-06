import type { IchiranWordInfo } from "../../../server/src/ichiran.types";
import type { Mode } from "./types";


type WordProps = {
    word: IchiranWordInfo;
    isCurrent: boolean;
    showFurigana: boolean;
    mode: Mode;
    showText: boolean;
}

const hiddenStyle: Record<Mode,string> = {
    paragraph: "opacity-0", // invisible, keeps its space
    focused: "hidden",      // removed from layout
};

export default function Word({ word, isCurrent, showText, showFurigana, mode }:WordProps){
    
    return(
        <>
            {!showText && <span className={isCurrent ? "" : hiddenStyle[mode]}>{word.text}</span>}
            {showText && <span>{word.text}</span>}
        </>

        
    )
}