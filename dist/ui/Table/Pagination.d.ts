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
export declare function Pagination({ page, perPage, total, onChange, disabled, label, previousLabel, nextLabel, formatRange, }: PaginationProps): import("react").JSX.Element | null;
