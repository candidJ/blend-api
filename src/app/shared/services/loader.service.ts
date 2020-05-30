import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _loadingPublisher = new Subject();
  private _loader$ = this._loadingPublisher.subscribe();

  showLoader(isLoading: boolean) {
    return this._loadingPublisher.next(isLoading);
  }

  checkLoadingState() {
    return this._loader$;
  }

}
