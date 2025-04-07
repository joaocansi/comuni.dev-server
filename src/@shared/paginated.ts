export type PaginatedResult<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type PaginationOptions<Filter> = {
  page: number;
  limit: number;
  filters?: Filter;
};
