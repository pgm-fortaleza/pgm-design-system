import { cloneElement, useId, useState, type FocusEvent, type KeyboardEvent, type ReactElement, type ReactNode } from "react";
import style from "./Tooltip.module.css";

export type TooltipPlacement = "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end";

export interface TooltipProps {
  children: ReactElement<{ "aria-describedby"?: string; "aria-label"?: string }>;
  text: ReactNode;
  placement?: TooltipPlacement;
  className?: string;
}

const placements: Record<TooltipPlacement, string> = {
  top: style.top,
  "top-start": style.topStart,
  "top-end": style.topEnd,
  bottom: style.bottom,
  "bottom-start": style.bottomStart,
  "bottom-end": style.bottomEnd,
};

export function Tooltip({ children, text, placement = "top", className }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const repeatsLabel = typeof text === "string" && children.props["aria-label"] === text;
  const describedBy = repeatsLabel
    ? children.props["aria-describedby"]
    : [children.props["aria-describedby"], id].filter(Boolean).join(" ");

  const classes = [style.tooltip, placements[placement], open ? style.open : undefined, className].filter(Boolean).join(" ");

  const handleBlur = (event: FocusEvent<HTMLSpanElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Escape") setOpen(false);
  };

  return (
    <span
      className={classes}
      onBlur={handleBlur}
      onFocus={() => setOpen(true)}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {cloneElement(children, { "aria-describedby": describedBy || undefined })}
      <span className={style.surface} id={id} role="tooltip" aria-hidden={repeatsLabel || !open}>
        {text}
      </span>
    </span>
  );
}
