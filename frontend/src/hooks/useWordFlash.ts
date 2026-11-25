import { useEffect, useState } from "react";
import { getDelay } from "./getDelay.ts";
import type { IchiranWordInfo } from "../../../server/src/ichiran.types.ts";

export function useWordFlash(
  playing: boolean,
  setPlaying: (playing: boolean) => void,
  stop: boolean,
  setStop: (stop: boolean) => void,
  speed: number,
  tokens: IchiranWordInfo[],
  tokenChunkSize: number // need to make an array of 'tokenChunkSize' length elements and increment through them 
) {
  const [flashIndex, setFlashIndex] = useState(1);

  // Effect 1: flashes the words one at a time every 'tick'
  useEffect(() => {
    if (!playing || stop) return;
    
    const token = tokens[flashIndex];
    if (token === undefined) return; 
    console.log("effect run", { flashIndex, token, delay: getDelay(token.text, speed) });
    const id = setTimeout(() => {
      setFlashIndex((current) => (current + 1 ));
    }, getDelay(token.text,speed));

    return () => clearTimeout(id);
  }, [playing, flashIndex, speed, tokens, stop]);

  // Effect 2: listens for end of text
  useEffect(() => {
    if ((tokens.length > 0 && flashIndex >= tokens.length )|| stop) {
      setPlaying(false);
      setStop(false);
      setFlashIndex(0);
    }
  }, [flashIndex, tokens.length, setPlaying, stop, setStop]);

  return flashIndex;
}