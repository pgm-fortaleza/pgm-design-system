import { type ButtonHTMLAttributes, type ReactNode } from "react";
export interface PillProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "aria-pressed"> {
    selected: boolean;
    onChange(selected: boolean): void;
    children: ReactNode;
}
export declare const Pill: import("react").ForwardRefExoticComponent<PillProps & import("react").RefAttributes<HTMLButtonElement>>;
