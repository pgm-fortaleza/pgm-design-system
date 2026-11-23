import { useEffect, useId, useRef, type ReactNode } from "react";
import { IconButton } from "../IconButton";
import style from "./Dialog.module.css";

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

const sizes: Record<DialogSize, string> = {
  small: style.small,
  medium: style.medium,
  large: style.large,
};

export function Dialog({
  open,
  onClose,
  title,
  icon,
  closeLabel,
  actions,
  headerActions,
  size = "medium",
  dismissible = true,
  className,
  children,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const pressedOnBackdrop = useRef(false);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return undefined;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    if (!open) return undefined;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={[style.dialog, sizes[size], className].filter(Boolean).join(" ")}
      aria-labelledby={title ? titleId : undefined}
      onCancel={(event) => {
        event.preventDefault();
        if (dismissible) onClose();
      }}
      onMouseDown={(event) => {
        pressedOnBackdrop.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        if (dismissible && pressedOnBackdrop.current && event.target === event.currentTarget) onClose();
        pressedOnBackdrop.current = false;
      }}
    >
      {open && (
        <div className={style.surface}>
          {(title || closeLabel || headerActions) && (
            <div className={style.header}>
              {icon && (
                <span className={style.icon} aria-hidden="true">
                  {icon}
                </span>
              )}
              {title && (
                <h2 id={titleId} className={style.title}>
                  {title}
                </h2>
              )}
              {headerActions}
              {closeLabel && (
                <IconButton
                  label={closeLabel}
                  onClick={onClose}
                  icon={
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" focusable="false">
                      <path d="M6.4 19 5 17.6 10.6 12 5 6.4 6.4 5 12 10.6 17.6 5 19 6.4 13.4 12 19 17.6 17.6 19 12 13.4Z" />
                    </svg>
                  }
                />
              )}
            </div>
          )}
          <div className={style.content}>{children}</div>
          {actions && <div className={style.actions}>{actions}</div>}
        </div>
      )}
    </dialog>
  );
}
