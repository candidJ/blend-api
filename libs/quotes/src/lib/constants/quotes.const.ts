import { InjectionToken } from '@angular/core';
import { ProgrammingQuotesService } from '../services/programming-quotes.service';

export const LIFE_QUOTES = {
  URL: 'https://quote-garden.onrender.com/api/v3/quotes/',
  LIMIT: 20,
};

export const PROGRAMMING_QUOTES = {
  URL: 'https://programming-quotes-api.herokuapp.com/quotes/',
  PAGE_SIZE: 20,
  TOTAL_RECORDS: 501,
};
export const TWITTER = {
  URL: 'https://www.twitter.com/intent/tweet?hashtags',
  HASHTAGS: 'quote',
};

export const QUOTES_SERVICE_TOKEN =
  new InjectionToken<ProgrammingQuotesService>('QUOTES_SERVICE_TOKEN');
