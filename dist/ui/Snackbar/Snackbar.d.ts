export interface SnackbarProps {
    message: string | null;
    onClose(): void;
    duration?: number;
}
export declare function Snackbar({ message, onClose, duration }: SnackbarProps): import("react").JSX.Element;
