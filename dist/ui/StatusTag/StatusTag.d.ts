import type { HTMLAttributes, ReactNode } from "react";
export type StatusTagTone = "success" | "warning" | "error" | "info" | "secondary" | "neutral";
export interface StatusTagProps extends HTMLAttributes<HTMLSpanElement> {
    tone?: StatusTagTone;
    dot?: boolean;
    children: ReactNode;
}
export declare function StatusTag({ tone, dot, className, children, ...rest }: StatusTagProps): import("react").JSX.Element;
