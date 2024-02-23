import { Component, Directive, inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'ba-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: true,
  imports: [AsyncPipe],
})
export class LoaderComponent {
  readonly loaderService: LoaderService = inject(LoaderService);
}
