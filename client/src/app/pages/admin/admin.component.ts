import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { EbookModel } from '../../../models/ebook.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { AddEbookFormDialogComponent } from './components/add-ebook-form-dialog/add-ebook-form-dialog.component';
import { EditEbookFormDialogComponent } from './components/edit-ebook-form-dialog/edit-ebook-form-dialog.component';
import { CategoryModel } from '../../../models/category.model';
import { CardService, GENRES } from '../../../services/card.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SharedModule, MaterialModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements AfterViewInit {
  //table
  displayedColumns: string[] = [
    'select',
    // 'id',
    'image',
    'title',
    'author',
    'detail',
    'view',
    'like',
    'genre',
  ];
  dataSource: MatTableDataSource<EbookModel>;
  selection = new SelectionModel<EbookModel>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ebooks: EbookModel[] = [];

  //dialog
  readonly dialog = inject(MatDialog);

  constructor(private cardService: CardService) {
    // Create 100 ebooks
    this.ebooks = Array.from({ length: 10 }, (_, k) =>
      cardService.createNewEbook(k + 1),
    );

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.ebooks);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: EbookModel): string {
    if (!row) {
      return `${this.selection.hasValue() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${Number(row.id) + 1}`;
  }

  toggle(row: EbookModel) {
    if (this.selection.isSelected(row)) {
      // console.log(row);
      this.selection.deselect(row);
    } else {
      this.selection.clear(); // Clear all selections
      this.selection.toggle(row); // Select the clicked row
    }
    //log the checked row
    // console.log(this.selection.selected);
  }

  reInitTable(ebook: EbookModel) {
    this.ebooks.push(ebook);
    this.dataSource = new MatTableDataSource(this.ebooks);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openCreateEbookDialog() {
    const dialogRef = this.dialog.open(AddEbookFormDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let newEbook: EbookModel = {
          ...result,
          id: (this.dataSource.data.length + 1).toString(),
          like: 0,
          view: 0,
          date: new Date().toDateString(),
        };
        this.reInitTable(newEbook);
        console.log(newEbook);
      }
    });
  }

  openEditEbookDialog() {
    const dialogRef = this.dialog.open(EditEbookFormDialogComponent, {
      data: this.selection.selected[0],
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // let newEbook: EbookModel = {
        //   ...result,
        //   id: (this.dataSource.data.length + 1).toString(),
        //   like: 0,
        //   view: 0,
        //   date: new Date().toDateString(),
        // };
        console.log(result);
      }
    });
  }
}
