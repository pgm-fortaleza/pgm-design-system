import { type MouseEventHandler, type ReactNode } from "react";
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
export declare function NavigationRail({ label, sections, onNavigate, renderLink, className }: NavigationRailProps): import("react").JSX.Element;
