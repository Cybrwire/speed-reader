import { Button } from "./Button"
import { OpenEye, PlayIcon } from "./icons"
import { type ParseResponse } from "../../../server/src/ichiran.types.jsx"

type ReadingAreaProps = {
    result: ParseResponse | null;
};

export function ReadingArea({ result }:ReadingAreaProps) {

    if (!result) return;
    console.log(result);
    return (
            <section className="flex flex-col border-2 p-2">
                <div className="flex items-center justify-between"> 
                    <h3 className="text-2xl">Reading Area</h3>
                    <div>
                        <Button variant='show-hide' ><OpenEye/></Button>
                        <Button variant='show-hide' ><PlayIcon/></Button>
                    </div>
                </div>
                <div className="border">
                        {result.tokens.map((token,i) => (
                            <span key={i}>{token.text}</span>
                        ))}
                </div>
            </section>
    )
}