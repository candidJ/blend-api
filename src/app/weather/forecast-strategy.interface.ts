import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

export interface ForecastStrategy {
    forecast(): Observable<HttpParams>;
}