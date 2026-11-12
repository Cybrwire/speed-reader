const baseLength = 4;
const extraDelay = 0.20;

export function getDelay(token:string, speed:number):number{
    
    const overLength = Math.max(0, token.length - baseLength);
    const delayTime  = speed + overLength * (speed * extraDelay);
    
    return Math.min(delayTime, speed * 2);

}