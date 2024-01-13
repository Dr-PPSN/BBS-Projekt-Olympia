import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatProgressSpinnerModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.sass'
})
export class TableComponent implements OnChanges{
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
@Input() dataSource: any[] = [];
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
@Input() columns: any[] = [];
  displayedColumns: string[] = [];
  sortDirection: SortDirection = "asc";

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  matTableDataSource: MatTableDataSource<any> = new MatTableDataSource;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  editingRowIndex = -1;
  editedColumn = '';

  ngOnChanges(changes: SimpleChanges): void {
    // biome-ignore lint/complexity/useLiteralKeys: <explanation>
if  (changes['dataSource']?.currentValue) {
      this.flattenDataStructure(this.dataSource[0], '');
      this.matTableDataSource = new MatTableDataSource(this.dataSource);
      this.matTableDataSource.sort = this.sort;
      this.matTableDataSource.paginator = this.paginator;
    }
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
flattenDataStructure(obj: any, prefix: string): void {
    for (const key in obj) {
      // biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
if  (obj.hasOwnProperty(key)) {
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'object') {
          this.flattenDataStructure(obj[key], newKey);
        } else {
          this.displayedColumns.push(newKey);
        }
      }
    }
  }

  sortData(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
this.matTableDataSource.sort!.direction = this.sortDirection;
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
startEditing(row: any, column: string): void {
    this.editingRowIndex = this.matTableDataSource.data.indexOf(row);
    this.editedColumn = column;
  }

  stopEditing(): void {
    this.editingRowIndex = -1;
    this.editedColumn = '';
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
isEditing(row: any, column: string): boolean {
    return this.editingRowIndex === this.matTableDataSource.data.indexOf(row) && this.editedColumn === column;
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
saveChanges(row: any): void {
    // Hier kannst du die geänderten Daten in die Datenbank speichern
    // Füge hier die Logik hinzu, um die Änderungen in der Datenbank zu übernehmen
    this.stopEditing();
  }
}



