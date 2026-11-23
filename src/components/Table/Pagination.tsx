import { IconButton } from "../IconButton";
import style from "./Table.module.css";

export interface PaginationProps {
  page: number;
  perPage: number;
  total: number;
  onChange(page: number): void;
  disabled?: boolean;
  label?: string;
  previousLabel?: string;
  nextLabel?: string;
  formatRange?(first: number, last: number, total: number): string;
}

const defaultRange = (first: number, last: number, total: number) => `${first}–${last} de ${total}`;

const chevron = (path: string) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" focusable="false">
    <path d={path} />
  </svg>
);

export function Pagination({
  page,
  perPage,
  total,
  onChange,
  disabled = false,
  label = "Paginação",
  previousLabel = "Página anterior",
  nextLabel = "Próxima página",
  formatRange = defaultRange,
}: PaginationProps) {
  if (total <= perPage) return null;

  const lastPage = Math.ceil(total / perPage);
  const first = (page - 1) * perPage + 1;
  const last = Math.min(page * perPage, total);

  return (
    <nav className={style.pagination} aria-label={label}>
      <span className={style.paginationRange} aria-live="polite">
        {formatRange(first, last, total)}
      </span>
      <IconButton
        label={previousLabel}
        tooltip
        disabled={disabled || page <= 1}
        onClick={() => onChange(page - 1)}
        icon={chevron("M14 18 8 12l6-6 1.4 1.4-4.6 4.6 4.6 4.6Z")}
      />
      <IconButton
        label={nextLabel}
        tooltip
        disabled={disabled || page >= lastPage}
        onClick={() => onChange(page + 1)}
        icon={chevron("M12.6 12 8 7.4 9.4 6l6 6-6 6L8 16.6Z")}
      />
    </nav>
  );
}
