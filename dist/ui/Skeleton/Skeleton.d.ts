import type { CSSProperties } from "react";
export type SkeletonShape = "text" | "rect" | "circle";
export interface SkeletonProps {
    shape?: SkeletonShape;
    width?: CSSProperties["width"];
    height?: CSSProperties["height"];
    className?: string;
}
export declare function Skeleton({ shape, width, height, className }: SkeletonProps): import("react").JSX.Element;
