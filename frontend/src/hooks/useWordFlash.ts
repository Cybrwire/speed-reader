import { useEffect, useState } from "react";

export function useWordFlash(
  playing: boolean,
  speed: number,
  tokenCount: number,
  setPlaying: (playing: boolean) => void
) {
  const [flashIndex, setFlashIndex] = useState(0);

  // Effect 1: flashes the words one at a time every 'tick'
  useEffect(() => {
    if (!playing) return;

    const id = setInterval(() => {
      setFlashIndex((prev) => (prev < tokenCount ? prev + 1 : prev));
    }, speed);

    return () => clearInterval(id);
  }, [playing, speed, tokenCount]);

  // Effect 2: listens for end of text
  useEffect(() => {
    if (tokenCount > 0 && flashIndex >= tokenCount) {
      setPlaying(false);
      setFlashIndex(0);
    }
  }, [flashIndex, tokenCount, setPlaying]);

  return flashIndex;
}