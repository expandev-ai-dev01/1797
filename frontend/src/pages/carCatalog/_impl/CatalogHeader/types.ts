export interface CatalogHeaderProps {
  total: number | undefined;
  sort: string;
  setSort: (value: string) => void;
}
