import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loadingPublisher: Subject<boolean> = new Subject();
  loader$: Observable<boolean> = this.loadingPublisher.asObservable();

  showLoader(isLoading: boolean): void {
    this.loadingPublisher.next(isLoading);
  }
}
