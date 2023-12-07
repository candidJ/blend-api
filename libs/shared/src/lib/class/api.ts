import { Observable, Subject } from 'rxjs';

export class FeedPubSub {

  protected actionSubject: Subject<number> = new Subject<number>();
  protected feedSubscriber: Observable<number> = this.actionSubject.asObservable();

  fetchFeedByPageNumber(page: number): void {
    this.actionSubject.next(page);
  }

}
