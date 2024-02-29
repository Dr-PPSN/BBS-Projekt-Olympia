// table.component.ts
import { CommonModule } from "@angular/common";
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatPaginator,
  MatPaginatorModule,
} from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSort, SortDirection } from "@angular/material/sort";
import {
  MatTableDataSource,
  MatTableModule,
} from "@angular/material/table";
import { isEqual } from 'lodash';


interface Column {
  name: string;
  label: string;
}

@Component({
  selector: "app-table",
  standalone: true,
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatPaginatorModule,
  ],
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.sass"],
})
export class TableComponent implements OnChanges {
  @Input() dataSource: any[] = [];
  @Input() columns: Column[] = [];
  @Output() saveMethodInPerent: EventEmitter<{row: any}> = new EventEmitter<{row: any}>();
  displayedColumns: string[] = [];
  mappedColumns: (string)[] = [];
  visibleColumns: Column[] = [];
  sortDirection: SortDirection = "asc";
  originalRowData: any;


  matTableDataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('table') tableElement!: ElementRef;


  editingRowIndex = -1;
  editedColumn = "";

  ngOnInit(){
      document.addEventListener('click', this.handleDocumentClick.bind(this));

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["dataSource"]?.currentValue) {
    //  this.flattenDataStructure(this.dataSource[0], "");
      console.log("dataSource:", this.dataSource);
      console.log("displayedColumns:", this.displayedColumns);
      console.log("columns:", this.columns);

      // Konsolen-Log für die zugeordneten Spalten
      const mappedColumns = this.displayedColumns.map(column => {
        const mappedColumn = this.columns.find(c => c.name === column);
        return mappedColumn ? mappedColumn.label : '';
      });
      console.log("mappedColumns:", mappedColumns);
      this.mappedColumns = mappedColumns; // Hier als Beispiel ein leeres Array als Default-Wert
      this.matTableDataSource.data = this.dataSource;
      console.log(this.dataSource)
      this.matTableDataSource.sort = this.sort;
      this.matTableDataSource.paginator = this.paginator;
      this.updateVisibleColumns();
    }
  }

  flattenDataStructure(obj: any, prefix: string = ''): void {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'object') {
          this.flattenDataStructure(obj[key], newKey);
        } else {
          const columnName = this.columns.find(column => column.label === newKey)?.name;
          if (columnName && !this.displayedColumns.includes(columnName)) {
            this.displayedColumns.push(columnName);
          }
        }
      }
    }
  }

  updateVisibleColumns(): void {
    this.visibleColumns = this.columns;
    this.displayedColumns = this.columns.map(column => column.name);
  }

  sortData(): void {
    this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    if (this.matTableDataSource.sort) {
      this.matTableDataSource.sort.direction = this.sortDirection;
    }
  }

  startEditing(row: any, column: string): void {
    this.editingRowIndex = this.matTableDataSource.data.indexOf(row);
    this.editedColumn = column;
    // Speichere eine Kopie der ursprünglichen Daten der Zeile
    this.originalRowData = { ...row };
  }

  stopEditing(): void {
    this.editingRowIndex = -1;
    this.editedColumn = "";
  }

  isEditing(row: any, column: string): boolean {
    return (
      this.editingRowIndex === this.matTableDataSource.data.indexOf(row) &&
      this.editedColumn === column
    );
  }

  saveChanges(row: any): void {
    // Überprüfe, ob sich die Daten geändert haben, bevor du speicherst
    if (!isEqual(this.originalRowData, row)) {

      console.log(this.originalRowData, row)
      // Hier kannst du die geänderten Daten in die Datenbank speichern
      // Füge hier die Logik hinzu, um die Änderungen in der Datenbank zu übernehmen

      this.saveMethodInPerent.emit({row})
      this.stopEditing();
    } else {
      // Keine Änderungen, beende den Bearbeitungsmodus
      console.log("not saved")
      console.log(this.originalRowData, row)


      this.stopEditing();
    }
  }

  onInputChange(newValue: any, row: any, column: string): void {
    // Hier wird der Wert des Eingabefeldes aktualisiert, wenn sich etwas ändert
    row[column] = newValue;
  
    // Finde den Index der geänderten Zeile in der Datasource
    const index = this.matTableDataSource.data.findIndex((r) => r === row);
  
    // Aktualisiere die Referenz auf das row-Objekt in der Datasource
    if (index !== -1) {
      this.matTableDataSource.data.splice(index, 1, { ...row });
      this.matTableDataSource._updateChangeSubscription(); // Force update
    }
    console.log(this.matTableDataSource)
  
    console.log(newValue);
    console.log(row, row[column]);
  }
  
  
  


  getColumnValue(row: any, column: string): any {
    const keys = column.split(".");
    let value = row;
    for (const key of keys) {
      if (value?.hasOwnProperty(key)) {
        value = value[key];
      } else {
        value = 'keine Daten';
        this.handleError();
        break;
      }
    }
    return value;
  }
  

handleError(): void {
  // Hier kannst du die Logik für den Umgang mit dem Fehler implementieren
  console.error("Ein Wert ist null.");
}

getColumnDefinition(label: string): Column | undefined {
  return this.columns.find(column => column.label === label);
}



handleCellMouseDown(event: MouseEvent, row: any, column: string): void {
  // Überprüfe, ob der Mausklick innerhalb des Eingabefeldes erfolgt ist
  const target = event.target as HTMLElement;
  const isInput = target.tagName.toLowerCase() === 'input';

  if (isInput) {
    event.stopPropagation(); // Verhindere, dass das mousedown-Ereignis den Vorgang weiterleitet
  }
}

handleCellDoubleClick(row: any, column: string): void {
  if (!this.isEditing(row, column)) {
    this.startEditing(row, column);
  }
}


preventSave(event: MouseEvent): void {
  // Überprüfe, ob der Klick innerhalb des Eingabefeldes erfolgt ist
  const target = event.target as HTMLElement;
  const isInput = target.tagName.toLowerCase() === 'input';

  if (!isInput) {
    const editedCell = this.getEditedCell();
    if (editedCell) {
      this.stopEditing();
      this.saveChanges(editedCell.row);
    }
  }
}

getEditedCell(): { row: any, column: string } | null {
  // Hier kannst du die Logik implementieren, um die gerade bearbeitete Zelle zu identifizieren
  // Rückgabeformat: { row: aktuelleBearbeiteteZeile, column: aktuelleBearbeiteteSpalte }
  return null;
}

handleCellBlur(event: FocusEvent, row: any, column: string): void {
  if (this.isEditing(row, column)) {
    this.saveChanges(row);
  }
}




handleCellKeyUp( row: any, column: string): void {
  if (this.isEditing(row, column)) {
    this.saveChanges(row);
  }
}

handleDocumentClick(event: MouseEvent): void {
  const target = event.target as HTMLElement;
  const isInput = target.tagName.toLowerCase() === 'input';

  if (!isInput) {
    // Überprüfe, ob gerade eine Zelle bearbeitet wird, und speichere die Änderungen
    if (this.editingRowIndex !== -1) {
      const editedRow = this.matTableDataSource.data[this.editingRowIndex];
      this.saveChanges(editedRow);
    }
  }
}




}

