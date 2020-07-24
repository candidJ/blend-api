import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationConfig } from '../../interface/interface';


@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input("paginationConfig") paginationConfig: PaginationConfig;
  @Output() onPaginatorChange: EventEmitter<number> = new EventEmitter<number>();
  public activePage = 1;
  public record = {
    start: 1,
    end: 20
  };

  constructor() { }

  public onPageChange(page: number) {
    console.log(page);
    this.activePage = page;
    this.onPaginatorChange.emit(page);
  }

  ngOnInit(): void {
  }

}
