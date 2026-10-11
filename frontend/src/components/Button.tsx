
import type { ComponentProps } from "react";

type Variant = 'show-hide' | 'play-pause' | 'new-text';

type ButtonProps = {
    variant: Variant
} & ComponentProps<'button'>

export function Button({variant, ...props}:ButtonProps) {
    return (
        <button 
            {...props}
            className={ `${getVariantStyles(variant)} border-2 border-b-mist-600 rounded-2xl` } />
    )
}

function getVariantStyles(variant: Variant) {
    switch(variant){
        case "show-hide":
            return "bg-purple px-2 py-2 h-4 w-4"
        case "play-pause":
            return "bg-blue"
        case "new-text":
            return "bg-green px-4 py-2"
        
        default: 
            throw new Error(`Invalid variant: ${variant satisfies never}"`)
    }
}