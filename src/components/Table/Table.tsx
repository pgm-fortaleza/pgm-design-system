import type { ReactNode } from "react";
import { Skeleton } from "../Skeleton";
import style from "./Table.module.css";

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

const aligns: Record<TableAlign, string> = {
  start: style.alignStart,
  center: style.alignCenter,
  end: style.alignEnd,
};

const placeholders = (count: number) => Array.from({ length: count }, (_, index) => index);

export function Table<T>({
  caption,
  columns,
  rows,
  rowKey,
  loading = false,
  loadingRows = 5,
  emptyState,
  renderCompactRow,
  className,
}: TableProps<T>) {
  const empty = !loading && rows.length === 0;

  return (
    <div className={[style.container, className].filter(Boolean).join(" ")} aria-busy={loading}>
      <table className={[style.table, renderCompactRow ? style.hideOnCompact : undefined].filter(Boolean).join(" ")}>
        <caption className={style.visuallyHidden}>{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`${style.headerCell} ${aligns[column.align ?? "start"]}`}
                style={column.width ? { width: column.width } : undefined}
              >
                <span className={column.srOnlyHeader ? style.visuallyHidden : undefined}>{column.header}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading &&
            placeholders(loadingRows).map((index) => (
              <tr key={`skeleton-${index}`} className={style.row}>
                {columns.map((column) => (
                  <td key={column.key} className={style.cell}>
                    <Skeleton />
                  </td>
                ))}
              </tr>
            ))}
          {!loading &&
            rows.map((row) => (
              <tr key={rowKey(row)} className={style.row}>
                {columns.map((column) => (
                  <td key={column.key} className={`${style.cell} ${aligns[column.align ?? "start"]}`}>
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>

      {renderCompactRow && (
        <ul className={style.compactList} aria-label={caption}>
          {loading &&
            placeholders(loadingRows).map((index) => (
              <li key={`skeleton-${index}`} className={style.compactItem}>
                <Skeleton />
                <Skeleton width="50%" />
              </li>
            ))}
          {!loading &&
            rows.map((row) => (
              <li key={rowKey(row)} className={style.compactItem}>
                {renderCompactRow(row)}
              </li>
            ))}
        </ul>
      )}

      {loading && (
        <span className={style.visuallyHidden} role="status">
          {caption}
        </span>
      )}
      {empty && emptyState && <div className={style.empty}>{emptyState}</div>}
    </div>
  );
}
