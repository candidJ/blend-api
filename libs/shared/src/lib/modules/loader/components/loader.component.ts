import { Component, OnInit, Directive } from '@angular/core';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'ba-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService) {}
}

@Directive()
export class LoaderComponentWithState implements OnInit {
  constructor(public loaderService: LoaderService) {}

  ngOnInit(): void {}
}
