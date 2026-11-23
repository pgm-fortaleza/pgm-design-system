import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
import style from "./Button.module.css";

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

type LabelProps =
  | { children: ReactNode; "aria-label"?: string }
  | { children?: undefined; icon: ReactNode; "aria-label": string };

type AsButton = BaseProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps | "children">;
type AsLink = BaseProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps | "children">;

export type ButtonProps = (AsButton | AsLink) & LabelProps;

const variants: Record<ButtonVariant, string> = {
  filled: style.filled,
  tonal: style.tonal,
  outlined: style.outlined,
  text: style.text,
  elevated: style.elevated,
};

const sizes: Record<ButtonSize, string> = {
  small: style.small,
  medium: style.medium,
  large: style.large,
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(function Button(props, ref) {
  const {
    variant = "filled",
    size = "small",
    shape = "round",
    icon,
    trailingIcon,
    fullWidth = false,
    disabled = false,
    className,
    children,
    "aria-label": ariaLabel,
    ...rest
  } = props;

  const iconOnly = children === undefined;

  const classes = [
    style.button,
    variants[variant],
    sizes[size],
    shape === "square" ? style.square : style.round,
    iconOnly ? style.iconOnly : undefined,
    fullWidth ? style.fullWidth : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon && (
        <span className={style.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      {iconOnly ? <span className={style.visuallyHidden}>{ariaLabel}</span> : <span className={style.label}>{children}</span>}
      {trailingIcon && (
        <span className={style.icon} aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, onClick, ...anchor } = rest as AsLink;
    return (
      <a
        {...anchor}
        aria-label={iconOnly ? undefined : ariaLabel}
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={classes}
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : anchor.tabIndex}
        onClick={disabled ? (event) => event.preventDefault() : onClick}
      >
        {content}
      </a>
    );
  }

  const { type = "button", ...button } = rest as AsButton;
  return (
    <button
      {...button}
      aria-label={iconOnly ? undefined : ariaLabel}
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      className={classes}
      disabled={disabled}
    >
      {content}
    </button>
  );
});
