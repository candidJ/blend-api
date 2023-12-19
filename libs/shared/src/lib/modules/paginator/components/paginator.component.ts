import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnDestroy,
  signal,
} from '@angular/core';
import { PaginationConfig, RecordType } from '../types/paginator.interface';

@Component({
  selector: 'ba-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit, OnDestroy {
  record = signal<RecordType>({start: 1, end: 20});
  activePage = 1;
  pagination: PaginationConfig;

  @Input('paginationConfig') 
  set paginationConfig(value: PaginationConfig) {
    if(value) {
      this.record.mutate((record) =>  record.end = value.pageSize);
      this.pagination = value;
    }
  }

  @Output() onPaginatorChange: EventEmitter<number> =
    new EventEmitter<number>();

  constructor() {}

  /**
   * Calculate the range of activeRecords
   * @param page
   */
  private showActiveRecordsRange(page: number) {
    const { pageSize, noOfPages, listLength } = this.pagination;
    this.record.set({
        start : page === 1 ? 1: pageSize * (page - 1),
        end : page === noOfPages ? listLength : page * pageSize
    });
  }

  onPageChange(page: number) {
    this.activePage = page;
    this.onPaginatorChange.emit(page);
    this.showActiveRecordsRange(page);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.onPaginatorChange.unsubscribe();
  }
}
