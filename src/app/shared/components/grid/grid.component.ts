import { Component, OnInit, Input, TemplateRef, ContentChild, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, AfterContentInit {  //TODO: implement generics
  @Input() gridData;
  @Input() gridColumns: Array<any>;
  @Input() noOfPages$: Observable<number[]>;

  // @ContentChild("view")
  // view: TemplateRef<any>;
  @ContentChild("gridItems")
  items: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
    console.log(this.gridData, "this.grid data");
  }

  ngAfterContentInit(): void {
    console.log("view", this.items);
  }

}
