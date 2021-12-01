import { Component, OnInit, Input, TemplateRef, ContentChild, AfterContentInit,
  Attribute, ContentChildren, QueryList, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'ba-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent implements OnInit, AfterContentInit {  //TODO: implement generics
  @Input("gridData") gridData$: Observable<any[]>;
  @Input() gridColumns: Array<string>;

  // @ContentChild("view")
  // view: TemplateRef<any>;
  @ContentChild("gridItems")
  items: TemplateRef<any>;

  constructor() { 
  }

  ngOnInit(): void {
    // console.log(this.gridData, "this.grid data");
  }

  ngAfterContentInit(): void {
    // console.log("view", this.items);
  }

}
