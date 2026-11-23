import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { type TooltipPlacement } from "../Tooltip";
export type IconButtonVariant = "standard" | "filled" | "tonal" | "outlined";
export type IconButtonSize = "small" | "medium" | "large";
export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "aria-label"> {
    icon: ReactNode;
    label: string;
    variant?: IconButtonVariant;
    size?: IconButtonSize;
    tooltip?: boolean | TooltipPlacement;
}
export declare const IconButton: import("react").ForwardRefExoticComponent<IconButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
