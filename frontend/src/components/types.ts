export type Settings = {
    speed: number;
    mode: "paragraph" | "focused"; //modes for how text is present
    showFurigana: boolean;
    fontSize: number;
    tokenChunkSize: number;
}