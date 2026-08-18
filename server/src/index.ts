import { parseWithIchiran } from './ichiran.js';

async function main(){
    const result = await parseWithIchiran("これは、テストじゃないか！");
    
    console.log(result); 
}

main()