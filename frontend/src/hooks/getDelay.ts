const baseLength = 3;
const extraDelay = 0.30;

export function getDelay(token:string, speed:number):number{
    
    const overLength = Math.max(0, token.length - baseLength);
    const delayTime  = speed + overLength * (speed * extraDelay);
    
    return Math.min(delayTime, speed * 2);

}