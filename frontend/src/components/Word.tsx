import type { IchiranWordInfo } from "../../../server/src/ichiran.types";
import type { Mode } from "./types";


type WordProps = {
    word: IchiranWordInfo;
    isCurrent: boolean;
    showFurigana: boolean;
    mode: Mode;
}


const hiddenStyle: Record<Mode,string> = {
    paragraph: "opacity-0", // invisible, keeps its space
    focused: "hidden",      // removed from layout
};

export default function Word({ word, isCurrent, showFurigana, mode }:WordProps){
    

    return(
        <span className={isCurrent ? "" : hiddenStyle[mode]}>{word.text}</span>
    )
}