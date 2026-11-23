import type { HTMLAttributes, ReactNode } from "react";
import style from "./StatusTag.module.css";

export type StatusTagTone = "success" | "warning" | "error" | "info" | "neutral";

export interface StatusTagProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: StatusTagTone;
  dot?: boolean;
  children: ReactNode;
}

const tones: Record<StatusTagTone, string> = {
  success: style.success,
  warning: style.warning,
  error: style.error,
  info: style.info,
  neutral: style.neutral,
};

export function StatusTag({ tone = "neutral", dot = true, className, children, ...rest }: StatusTagProps) {
  return (
    <span {...rest} className={[style.tag, tones[tone], className].filter(Boolean).join(" ")}>
      {dot && <span aria-hidden="true" className={style.dot} />}
      {children}
    </span>
  );
}
