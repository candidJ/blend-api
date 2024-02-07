import { TWITTER } from '../constants/quotes.const';

export function sendTweet<T, K extends keyof T>(quote: T, keys: Array<K>) {
  const quoteText = `${TWITTER.URL}=${TWITTER.HASHTAGS}&text=${quote[keys[1]]}`;

  if (quote[keys[0]]) {
    window.open(`${quoteText}~${quote[keys[0]]}`);
  } else {
    window.open(`${quoteText}`);
  }
}
