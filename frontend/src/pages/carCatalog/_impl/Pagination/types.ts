export interface PaginationProps {
  metadata:
    | {
        page: number;
        totalPages: number;
      }
    | undefined;
  setPage: (page: number) => void;
}
