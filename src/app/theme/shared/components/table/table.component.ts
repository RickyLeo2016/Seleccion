import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnChanges{

  @Input() data: T[] = [];
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;
  @Input() pageNumber: number = 1;
  @Input() pageSizes: number[] = [10, 25, 50];
  @Input() filterKeys: string[] = []; 
  @Input() headers: { displayName: string, dataKey: string }[] = [];
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() filterChange = new EventEmitter<string>();
  globalFilter: string = '';
  filteredData: T[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['globalFilter']) {
      this.filteredData = this.applyFilter(this.data); // Aplica el filtro cuando los datos cambian}
      this.getRange();
    }
    if (changes['headers']) {
      this.filterKeys = this.headers.map(header => header.dataKey);
    }
  }
//#region Metodos
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.pageChange.emit(page);
    }
  }

  onPageSizeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.pageSize = +selectElement.value;
    this.pageSizeChange.emit(this.pageSize);
  }

  onFilterChange(filter: string): void {
    this.globalFilter = filter;
    this.filteredData = this.applyFilter(this.data);
    this.pageNumber = 1; 
    this.getRange();
  }

  applyFilter(data: T[]): T[] {
    if (this.globalFilter) {
      return data.filter(item =>
        this.filterKeys.some(key =>
          item[key]?.toString().toLowerCase().includes(this.globalFilter.toLowerCase())
        )
      );
    } else {
      return data;
    }
  }

  getRange(): string {
    const filteredLength = this.filteredData.length;
    const start = (this.pageNumber - 1) * this.pageSize + 1;
    const end = Math.min(this.pageNumber * this.pageSize, filteredLength);
    return `${start} a ${end} de ${filteredLength} registros`;
  }

  getHeaderDisplayName(key: string): string {
    const header = this.headers.find(h => h.dataKey === key);
    return header ? header.displayName : key;
  }

//#endregion

}
