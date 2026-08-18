export interface IchiranWordInfo {
    text: string;
    kana: string;
    
}

export type IchiranWordSlot = IchiranWordInfo | { alternative: IchiranWordInfo[] };

export type IchiranWordEntry = [string, IchiranWordSlot, unknown[]];

export type IchiranClump = [IchiranWordEntry[], number];

export type IchiranSegment = IchiranClump[];

export type IchiranResult = (IchiranSegment | string)[];
