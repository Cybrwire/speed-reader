import { execFile } from 'child_process';
import type { IchiranResult, IchiranWordSlot, IchiranWordInfo, IchiranClump, IchiranSegment, IchiranWordEntry } from './ichiran.types.js';

export function parseWithIchiran(sentence:string):Promise<IchiranWordInfo[]>{
    return new Promise((resolve,reject) => {
        execFile('docker', ['exec','ichiran-main-1','ichiran-cli','-f',sentence], { timeout: 10000 },(error,stdout,stderr) => {
            if (error){
                reject(error);
                return;
            } 
            try {
                const parsed = JSON.parse(stdout);
                const wordArray = getWordInfo(parsed);
                resolve(wordArray);
            } catch(parseError){
                reject(new Error(`Failed to parse ichiran output: ${stdout}`));
            }
        })
    })};

export function getWordInfo(data:IchiranResult):IchiranWordInfo[]{

    interface Word {
        text: string;
        kana: string;
    }
    const wordOutput:Word[] = [];

    data.forEach(item => { 
        if (typeof item == 'string'){
            wordOutput.push({ text: item, kana: "" });
            return;
        } else {
            item.forEach((tuple:IchiranClump) => {
            const wordEntries = tuple[0];
            wordEntries.forEach(entry => {
                const wordInfo = entry[1]

                if ('text' in wordInfo){
                        wordOutput.push({text: wordInfo.text, kana: wordInfo.kana});
                } else {
                    const first = wordInfo.alternative[0];
                    if (first) {
                        wordOutput.push({ text: first.text, kana: first.kana });
                    }
                }
                
            });
        });
        }
    })
    return wordOutput;
}

