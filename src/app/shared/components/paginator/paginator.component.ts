import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input("noOfPages$") noOfPages$: Observable<number[]>;

  constructor() { }

  public onPageNumber(page) {
    console.log(page);
  }

  ngOnInit(): void {
    // this.noOfPages$.subscribe(num => console.log(num, "ahsdjkhaskdhkas"));
    // console.log(this.noOfPages$);
  }

}
