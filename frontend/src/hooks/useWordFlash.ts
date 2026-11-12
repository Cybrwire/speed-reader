import { useEffect, useState } from "react";
import { getDelay } from "./getDelay.ts";
import type { IchiranWordInfo } from "../../../server/src/ichiran.types.ts";

export function useWordFlash(
  playing: boolean,
  speed: number,
  tokens: IchiranWordInfo[],
  setPlaying: (playing: boolean) => void
) {
  const [flashIndex, setFlashIndex] = useState(0);

  // Effect 1: flashes the words one at a time every 'tick'
  useEffect(() => {
    if (!playing) return;

    const token = tokens[flashIndex];
    if (token === undefined) return; 
    console.log("effect run", { flashIndex, token, delay: getDelay(token.text, speed) });
    const id = setTimeout(() => {
      setFlashIndex((current) => (current + 1 ));
    }, getDelay(token.text,speed));

    return () => clearTimeout(id);
  }, [playing, flashIndex, speed, tokens]);

  // Effect 2: listens for end of text
  useEffect(() => {
    if (tokens.length > 0 && flashIndex >= tokens.length) {
      setPlaying(false);
      setFlashIndex(0);
    }
  }, [flashIndex, tokens.length, setPlaying]);

  return flashIndex;
}