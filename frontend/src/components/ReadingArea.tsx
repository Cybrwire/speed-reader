import { Button } from "./Button"
import { OpenEye, PlayIcon } from "./icons"

export function ReadingArea() {
    return (
            <section className="flex flex-col border-2 p-2">
                <div className="flex items-center justify-between"> 
                    <h3 className="text-2xl">Reading Area</h3>
                    <div>
                        <Button variant='show-hide' ><OpenEye/></Button>
                        <Button variant='show-hide' ><PlayIcon/></Button>
                    </div>
                </div>
                <div>
                    parsed text goes here
                </div>
            </section>
    )
}