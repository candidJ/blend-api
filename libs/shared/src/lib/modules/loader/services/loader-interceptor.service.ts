import { Injectable, inject } from '@angular/core';
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
  readonly #loaderService: LoaderService = inject(LoaderService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    this.setLoadingState(true);
    return next.handle(req).pipe(
      tap({
        next: (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.setLoadingState(false);
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err) {
            this.setLoadingState(false);
          }
        },
      }),
    );
  }

  private setLoadingState(isLoading: boolean): void {
    this.#loaderService.showLoader(isLoading);
  }
}
