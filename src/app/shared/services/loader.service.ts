import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _loadingPublisher: Subject<boolean> = new Subject();
  private _loader$: Observable<boolean> = this._loadingPublisher.asObservable();

  showLoader(isLoading: boolean) {
    // console.log("is loading", isLoading);
    return this._loadingPublisher.next(isLoading);
  }

  currentLoadingState() {
    return this._loader$;
  }

}
