import { Fragment, useId, type MouseEventHandler, type ReactNode } from "react";
import style from "./NavigationRail.module.css";

export interface NavigationRailItem {
  key: string;
  label: string;
  icon: string;
  href: string;
  active?: boolean;
}

export interface NavigationRailSection {
  key: string;
  label: string;
  items: ReadonlyArray<NavigationRailItem>;
}

export interface NavigationRailLinkProps {
  href: string;
  className: string;
  "aria-current"?: "page";
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  children: ReactNode;
}

export interface NavigationRailProps {
  label: string;
  sections: ReadonlyArray<NavigationRailSection>;
  onNavigate?(): void;
  renderLink?(props: NavigationRailLinkProps): ReactNode;
  className?: string;
}

const defaultLink = ({ children, ...props }: NavigationRailLinkProps) => <a {...props}>{children}</a>;

export function NavigationRail({ label, sections, onNavigate, renderLink = defaultLink, className }: NavigationRailProps) {
  const id = useId();

  return (
    <nav aria-label={label} className={[style.rail, className].filter(Boolean).join(" ")}>
      {sections
        .filter((section) => section.items.length > 0)
        .map((section) => {
          const headingId = `${id}-${section.key}`;

          return (
            <div key={section.key} role="group" aria-labelledby={headingId} className={style.section}>
              <span id={headingId} className={style.sectionLabel}>
                {section.label}
              </span>

              {section.items.map((item) => (
                <Fragment key={item.key}>
                  {renderLink({
                    href: item.href,
                    className: [style.item, item.active ? style.active : undefined].filter(Boolean).join(" "),
                    "aria-current": item.active ? "page" : undefined,
                    onClick: onNavigate ? () => onNavigate() : undefined,
                    children: (
                      <>
                        <span aria-hidden="true" className={`material-symbols-sharp ${style.icon}`}>
                          {item.icon}
                        </span>
                        <span className={style.label}>{item.label}</span>
                      </>
                    ),
                  })}
                </Fragment>
              ))}
            </div>
          );
        })}
    </nav>
  );
}
