import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material';

export interface IPagination {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() pagination: IPagination;
  @Output() pageChange = new EventEmitter<PageEvent>();

  constructor() { }

  ngOnInit() {
  }

  public changePage(page: PageEvent): void {
    this.pageChange.emit(page);
  }

}
