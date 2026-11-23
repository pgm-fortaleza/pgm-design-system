import type { CSSProperties } from "react";
import style from "./Skeleton.module.css";

export type SkeletonShape = "text" | "rect" | "circle";

export interface SkeletonProps {
  shape?: SkeletonShape;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  className?: string;
}

const shapes: Record<SkeletonShape, string> = {
  text: style.text,
  rect: style.rect,
  circle: style.circle,
};

export function Skeleton({ shape = "text", width, height, className }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      className={[style.skeleton, shapes[shape], className].filter(Boolean).join(" ")}
      style={{ width, height }}
    />
  );
}
