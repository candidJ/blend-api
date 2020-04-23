import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {  //TODO: implement generics
  @Input() gridData;
  @Input() gridColumns: Array<any>;
  @Input() noOfPages$: Observable<number[]>;

  constructor() { }

  ngOnInit(): void {
    console.log(this.gridData, "this.grid data");
  }

}
