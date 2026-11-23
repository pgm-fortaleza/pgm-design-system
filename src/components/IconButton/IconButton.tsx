import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Tooltip, type TooltipPlacement } from "../Tooltip";
import style from "./IconButton.module.css";

export type IconButtonVariant = "standard" | "filled" | "tonal" | "outlined";
export type IconButtonSize = "small" | "medium" | "large";

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "aria-label"> {
  icon: ReactNode;
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  tooltip?: boolean | TooltipPlacement;
}

const variants: Record<IconButtonVariant, string> = {
  standard: style.standard,
  filled: style.filled,
  tonal: style.tonal,
  outlined: style.outlined,
};

const sizes: Record<IconButtonSize, string> = {
  small: style.small,
  medium: style.medium,
  large: style.large,
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(props, ref) {
  const { icon, label, variant = "standard", size = "small", tooltip = false, type = "button", className, ...rest } = props;

  const button = (
    <button
      {...rest}
      ref={ref}
      type={type}
      className={[style.iconButton, variants[variant], sizes[size], className].filter(Boolean).join(" ")}
    >
      <span className={style.icon} aria-hidden="true">
        {icon}
      </span>
      <span className={style.visuallyHidden}>{label}</span>
    </button>
  );

  if (!tooltip) return button;

  return (
    <Tooltip text={label} describes={false} placement={tooltip === true ? "top" : tooltip}>
      {button}
    </Tooltip>
  );
});
