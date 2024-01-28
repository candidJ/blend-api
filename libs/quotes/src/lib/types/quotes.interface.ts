export interface ProgrammingQuote {
  author: string;
  en: string;
}

export interface LifeQuote {
  quoteText: string;
  quoteAuthor: string;
}

interface LifeQuotePagination {
  currentPage: number;
  nextPage: number;
  totalPages: number;
}

export type QuoteProps<T> = [keyof T, keyof T];

export interface LifeQuoteResponse {
  data: LifeQuote[];
  pagination: LifeQuotePagination;
  totalQuotes: number;
}

export type PaginationFunc = (page: number) => void;
