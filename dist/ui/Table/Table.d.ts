import type { ReactNode } from "react";
export type TableAlign = "start" | "center" | "end";
export interface TableColumn<T> {
    key: string;
    header: ReactNode;
    render(row: T): ReactNode;
    align?: TableAlign;
    width?: string;
    srOnlyHeader?: boolean;
}
export interface TableProps<T> {
    caption: string;
    columns: ReadonlyArray<TableColumn<T>>;
    rows: ReadonlyArray<T>;
    rowKey(row: T): string | number;
    loading?: boolean;
    loadingRows?: number;
    emptyState?: ReactNode;
    renderCompactRow?(row: T): ReactNode;
    className?: string;
}
export declare function Table<T>({ caption, columns, rows, rowKey, loading, loadingRows, emptyState, renderCompactRow, className, }: TableProps<T>): import("react").JSX.Element;
