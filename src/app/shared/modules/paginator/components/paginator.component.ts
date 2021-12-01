import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnDestroy,
} from "@angular/core";

import { PaginationConfig } from "src/app/shared/modules/paginator/types/paginator.interface";

@Component({
  selector: "ba-paginator",
  templateUrl: "./paginator.component.html",
  styleUrls: ["./paginator.component.scss"],
})
export class PaginatorComponent implements OnInit, OnDestroy {
  public record: { start: number; end: number };
  public pgConfig: PaginationConfig;

  @Input("paginationConfig")
  set paginationConfig(value: PaginationConfig) {
    if (!this.record && value) {
      this.record = {
        start: 1,
        end: value.pageSize,
      };
      this.pgConfig = value;
    }
  }
  @Output() onPaginatorChange: EventEmitter<number> =
    new EventEmitter<number>();
  public activePage = 1;

  constructor() {}

  /**
   * Show the range of activeRecords being displayed
   * @param page
   */
  private showActiveRecordsRange(page: number) {
    const pageSize = this.pgConfig.pageSize;
    const noOfPages = this.pgConfig.noOfPages;
    const listLength = this.pgConfig.listLength;
    if (page === 1) {
      return (this.record = {
        start: 1,
        end: pageSize,
      });
    } else if (page === noOfPages) {
      const start = pageSize * (page - 1);
      const end = start + (listLength - start);
      return (this.record = {
        start,
        end,
      });
    } else {
      return (this.record = {
        start: (page - 1) * pageSize,
        end: page * pageSize,
      });
    }
  }

  public onPageChange(page: number) {
    console.log(page);
    this.activePage = page;
    this.onPaginatorChange.emit(page);
    this.showActiveRecordsRange(page);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.onPaginatorChange.emit(1);
  }
}
