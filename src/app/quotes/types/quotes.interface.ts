export interface IProgrammingQuotes {
  en: string;
  author: string;
  rating: number;
  id: string;
}

export interface ILifeQuotes {
  id: string;
  quoteText: string;
  quoteAuthor: string;
}

export interface ILifeQuotesResponse {
  data: ILifeQuotes[];
  pagination: {
    currentPage: number;
    nextPage: number;
    totalPages: number;
  };
  totalQuotes: number;
}
