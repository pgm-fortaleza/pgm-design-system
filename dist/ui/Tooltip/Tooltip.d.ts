import { type ReactElement, type ReactNode } from "react";
export type TooltipPlacement = "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end";
export interface TooltipProps {
    children: ReactElement<{
        "aria-describedby"?: string;
    }>;
    text: ReactNode;
    placement?: TooltipPlacement;
    describes?: boolean;
    className?: string;
}
export declare function Tooltip({ children, text, placement, describes, className }: TooltipProps): import("react").JSX.Element;
