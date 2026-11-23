import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import style from "./Pill.module.css";

export interface PillProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "aria-pressed"> {
  selected: boolean;
  onChange(selected: boolean): void;
  children: ReactNode;
}

export const Pill = forwardRef<HTMLButtonElement, PillProps>(function Pill(props, ref) {
  const { selected, onChange, onClick, type = "button", className, children, ...rest } = props;

  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      aria-pressed={selected}
      className={[style.pill, selected ? style.selected : undefined, className].filter(Boolean).join(" ")}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) onChange(!selected);
      }}
    >
      {selected && (
        <svg className={style.check} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M9.55 18 3.85 12.3l1.43-1.43 4.27 4.28 9.17-9.18 1.43 1.43Z" />
        </svg>
      )}
      <span className={style.label}>{children}</span>
    </button>
  );
});
