import { Button } from "./Button"
import { OpenEye, PlayIcon } from "./icons"

export function ReadingArea() {
    return (
            <div className="border-2 w-20">
                <Button variant='show-hide'>
                    <div className="inline-flex items-center justify-center" >
                        <OpenEye/>
                    </div>
                </Button>
            </div>
    )
}