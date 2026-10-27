import type { IchiranWordInfo } from "../../../server/src/ichiran.types";

type WordProps = {
    word: IchiranWordInfo;
    isCurrent: boolean;
    showFurigana: boolean;
}

export default function Word({ word, isCurrent, showFurigana }:WordProps){


    return(
        <span>{word.text}</span>
    )
}