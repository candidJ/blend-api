export interface ProgrammingQuote {
  author: string;
  en: string;
}

export interface LifeQuote {
  quoteText: string;
  quoteAuthor: string;
}

export type QuoteProps<T>  = [keyof T, keyof T];

export interface ILifeQuotesResponse {
  data: LifeQuote[];
  pagination: {
    currentPage: number;
    nextPage: number;
    totalPages: number;
  };
  totalQuotes: number;
}

export type PaginationFunc = (page: number) => void;
