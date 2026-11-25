import type { ComponentProps } from "react";

type Variant = 'show-hide' | 'play-pause' | 'new-text' | 'stop';

type ButtonProps = {
    variant: Variant
} & ComponentProps<'button'>

export function Button({variant, ...props}:ButtonProps) {
    return (
        <button 
            {...props}
            className={ `${getVariantStyles(variant)} m-2 cursor-pointer border-2 rounded-2xl` } />
    )
}

function getVariantStyles(variant: Variant) {
    switch(variant){
        case "show-hide":
            return "px-2 py-2 h-12 w-12"
        case "play-pause":
            return "px-2 py-2 h-12 w-12"
        case "new-text":
            return "px-4 py-2 size-fit justify-self-end"
        case "stop":
            return "px-2 py-2 h-12 w-12"
        default: 
            throw new Error(`Invalid variant: ${variant satisfies never}"`)
    }
}