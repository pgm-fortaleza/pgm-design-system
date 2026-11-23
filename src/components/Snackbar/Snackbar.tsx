import { useEffect } from "react";
import style from "./Snackbar.module.css";

export interface SnackbarProps {
  message: string | null;
  onClose(): void;
  duration?: number;
}

export function Snackbar({ message, onClose, duration = 4000 }: SnackbarProps) {
  useEffect(() => {
    if (!message) return undefined;
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [message, duration, onClose]);

  return (
    <div className={style.region} role="status" aria-live="polite">
      {message && (
        <div className={style.snackbar}>
          <span className={style.message}>{message}</span>
        </div>
      )}
    </div>
  );
}
