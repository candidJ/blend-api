import { Component, OnInit, OnDestroy, Directive } from '@angular/core';
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

@Directive()
export class LoaderComponentWithState implements OnInit {

  constructor(public loaderService: LoaderService) { }

  ngOnInit(): void {
  }
}
