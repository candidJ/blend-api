import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  ContentChild,
  AfterContentInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'ba-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnInit, AfterContentInit {
  @Input('gridData') gridData$: Observable<any[]>;
  @Input() gridColumns: Array<any>;

  @ContentChild('gridItems')
  items: TemplateRef<any>;

  constructor() {}

  ngOnInit(): void {
    // console.log(this.gridData, "this.grid data");
  }

  ngAfterContentInit(): void {
    // console.log("view", this.items);
  }
}
