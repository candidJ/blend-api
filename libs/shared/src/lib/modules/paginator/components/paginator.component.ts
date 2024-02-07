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
import { FeatherModule } from 'angular-feather';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ba-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  standalone: true,
  imports: [NgClass, FeatherModule],
})
export class PaginatorComponent implements OnInit, OnDestroy {
  record = signal<RecordType | null>(null);
  activePage = 1;
  pagination: PaginationConfig;

  @Input()
  get paginationConfig() {
    return this.pagination;
  }

  set paginationConfig(value: PaginationConfig) {
    if (value && value.noOfPages > 0 && !this.pagination) {
      this.record.update(() => {
        return {
          start: 1,
          end: value.pageSize,
        };
      });
      this.pagination = value;
    }
  }

  @Output() onPaginatorChange: EventEmitter<number> =
    new EventEmitter<number>();

  /**
   * Calculate the range of activeRecords
   * @param page
   */
  private showActiveRecordsRange(page: number) {
    const { pageSize, noOfPages, listLength } = this.pagination!;
    this.record.set({
      start: page === 1 ? 1 : pageSize * (page - 1),
      end: page === noOfPages ? listLength : page * pageSize,
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
