import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService) { }
}

export class LoaderComponentWithState implements OnInit, OnDestroy {

  public isLoading: boolean;
  private destroy$: Subject<boolean> = new Subject();
  constructor(public _loaderService: LoaderService) { }


  private watchForLoadingStateChange() {
    return this._loaderService.currentLoadingState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(loaderState => this.isLoading = loaderState);
  }

  ngOnInit(): void {
    this.watchForLoadingStateChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
