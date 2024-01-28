import { Observable, BehaviorSubject } from 'rxjs';

export class FeedPubSub {
  protected actionSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(1);
  protected feedSubscriber: Observable<number> =
    this.actionSubject.asObservable();

  fetchFeedByPageNumber(page: number): void {
    this.actionSubject.next(page);
  }
}
