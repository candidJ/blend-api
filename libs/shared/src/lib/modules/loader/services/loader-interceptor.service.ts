import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable()
export class LoaderInterceptorService implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    this.setLoadingState(true);
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.setLoadingState(false);
          }
        },
        (err: HttpErrorResponse) => {
          if (err) {
            this.setLoadingState(false);
          }
        },
      ),
    );
  }

  private setLoadingState(isLoading: boolean): void {
    this.loaderService.showLoader(isLoading);
  }
}
