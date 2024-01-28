import { AppConfig } from '@blend-api/shared';

export function sendTweet<T, K extends keyof T>(quote: T, keys: Array<K>) {
  const quoteText = `${AppConfig.TWITTER.URL}=${
    AppConfig.TWITTER.HASHTAGS
  }&text=${quote[keys[1]]}`;

  if (quote[keys[0]]) {
    window.open(`${quoteText}~${quote[keys[0]]}`);
  } else {
    window.open(`${quoteText}`);
  }
}
