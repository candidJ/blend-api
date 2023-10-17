import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _loadingPublisher: Subject<boolean> = new Subject();
  loader$: Observable<boolean> = this._loadingPublisher.asObservable();

  showLoader(isLoading: boolean): void {
    this._loadingPublisher.next(isLoading);
  }
}
