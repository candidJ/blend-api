import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnDestroy,
  signal,
  effect,
} from '@angular/core';
import { PaginationConfig, RecordType } from '../types/paginator.interface';

@Component({
  selector: 'ba-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit, OnDestroy {
  public record = signal<RecordType>({start: 1, end: 20});
  public activePage = 1;

  @Input('paginationConfig') pgConfig: PaginationConfig;
  @Output() onPaginatorChange: EventEmitter<number> =
    new EventEmitter<number>();

  constructor() {}

  /**
   * Calculate the range of activeRecords
   * @param page
   */
  private showActiveRecordsRange(page: number) {
    const { pageSize, noOfPages, listLength } = this.pgConfig;
    this.record.set({
        start : page === 1 ? 1: pageSize * (page - 1),
        end : page === noOfPages ? listLength : page * pageSize
    });
  }

  public onPageChange(page: number) {
    this.activePage = page;
    this.onPaginatorChange.emit(page);
    this.showActiveRecordsRange(page);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.onPaginatorChange.unsubscribe();
  }
}
