
import type { ComponentProps } from "react";

type Variant = 'show-hide' | 'play-pause' | 'new-text';

type ButtonProps = {
    variant: Variant
} & ComponentProps<'button'>

export function Button({variant, ...props}:ButtonProps) {
    return (
        <button 
            {...props}
            className={ `${getVariantStyles(variant)} cursor-pointer border-2 rounded-2xl` } />
    )
}

function getVariantStyles(variant: Variant) {
    switch(variant){
        case "show-hide":
            return "px-2 py-2 m-2"
        case "play-pause":
            return "bg-blue px-2 py-2"
        case "new-text":
            return "bg-green px-4 py-2 size-fit"
        
        default: 
            throw new Error(`Invalid variant: ${variant satisfies never}"`)
    }
}