import { AppConfig } from '@blend-api/shared';

export abstract class Quotes<T> {
  sendTweet(quote: T, author: keyof T, text: keyof T) {
    const quoteText = `${AppConfig.TWITTER.URL}=${AppConfig.TWITTER.HASHTAGS}&text=${quote[text]}`;
    if (quote[author]) {
      return window.open(`${quoteText}~${quote[author]}`);
    } else {
      return window.open(`${quoteText}`);
    }
  }

  abstract onPaginationChange(page: number): void;
}
