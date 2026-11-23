import { type ReactNode } from "react";
export type DialogSize = "small" | "medium" | "large";
export interface DialogProps {
    open: boolean;
    onClose(): void;
    title?: ReactNode;
    icon?: ReactNode;
    closeLabel?: string;
    actions?: ReactNode;
    headerActions?: ReactNode;
    size?: DialogSize;
    dismissible?: boolean;
    className?: string;
    children?: ReactNode;
}
export declare function Dialog({ open, onClose, title, icon, closeLabel, actions, headerActions, size, dismissible, className, children, }: DialogProps): import("react").JSX.Element;
