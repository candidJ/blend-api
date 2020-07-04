import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpResponse, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService } from './loader.service';
import { NotificationService } from 'src/app/notifications/notification.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {

  constructor(private _loaderService: LoaderService, private _notificationService: NotificationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.setLoadingState(true);
    return next.handle(req)
      .pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.setLoadingState(false);
          }
        }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
            this.setLoadingState(false);
            // this._notificationService.showErrorMessage("Some error occured...");
          }
        })
      );
  }

  private setLoadingState(isLoading: boolean): void {
    this._loaderService.showLoader(isLoading);
  }


}
