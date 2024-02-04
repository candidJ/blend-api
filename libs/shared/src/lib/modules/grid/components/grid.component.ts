import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { RouterLink } from '@angular/router';
import { NgClass, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'ba-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass, NgTemplateOutlet, RouterLink, FeatherModule],
})
export class GridComponent {
  @Input() gridColumns: Array<any>;
  @Input() gridRows: Array<any>;

  constructor() {}
}
