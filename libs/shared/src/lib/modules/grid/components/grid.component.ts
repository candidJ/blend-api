import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ba-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
  @Input() gridColumns: Array<any>;
  @Input() gridRows: Array<any>;

  constructor() {}
}
