import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
export type ButtonVariant = "filled" | "tonal" | "outlined" | "text" | "elevated";
export type ButtonSize = "small" | "medium" | "large";
export type ButtonShape = "round" | "square";
interface BaseProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    shape?: ButtonShape;
    icon?: ReactNode;
    trailingIcon?: ReactNode;
    fullWidth?: boolean;
    disabled?: boolean;
    className?: string;
}
type LabelProps = {
    children: ReactNode;
    "aria-label"?: string;
} | {
    children?: undefined;
    icon: ReactNode;
    "aria-label": string;
};
type AsButton = BaseProps & {
    href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps | "children">;
type AsLink = BaseProps & {
    href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps | "children">;
export type ButtonProps = (AsButton | AsLink) & LabelProps;
export declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLButtonElement | HTMLAnchorElement>>;
export {};
