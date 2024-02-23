import { Component, Directive, inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { AsyncPipe } from '@angular/common';
import { IconsModule } from '../../feather-icons/icons.module';
@Component({
  selector: 'ba-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: true,
  imports: [AsyncPipe, IconsModule],
})
export class LoaderComponent {
  readonly loaderService: LoaderService = inject(LoaderService);
}
