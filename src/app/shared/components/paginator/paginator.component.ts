import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input("noOfPages$") noOfPages$: Observable<number[]>;
  @Output() onPaginatorChange: EventEmitter<number> = new EventEmitter<number>();
  public activePage = 1;

  constructor() { }

  public onPageNumber(page: number) {
    console.log(page);
    this.activePage = page;
    this.onPaginatorChange.emit(page);
  }

  ngOnInit(): void {
    // this.noOfPages$.subscribe(num => console.log(num, "ahsdjkhaskdhkas"));
    // console.log(this.noOfPages$);
  }

}
