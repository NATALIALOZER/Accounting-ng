import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ICategory } from '../../shared/models/interfaces';
import { Subject, takeUntil } from 'rxjs';
import { DbProfileInfoService } from '../../shared/services/db-profile-info.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddEventComponent } from './modal-add-event/modal-add-event.component';
import { ModalAddCategoryComponent } from './modal-add-category/modal-add-category.component';
import { ModalEditCategoryComponent } from './modal-edit-category/modal-edit-category.component';
import { ModalDeleteCategoryComponent } from './modal-delete-category/modal-delete-category.component';

@Component({
  selector: 'app-record-page',
  templateUrl: './record-page.component.html',
  styleUrls: ['./record-page.component.scss']
})
export class RecordPageComponent implements OnInit {
  public dataSource!: MatTableDataSource<ICategory>;
  public data: ICategory[] = [];
  public displayedColumns: string[] = ['position', 'name', 'capacity', 'action'];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private profileInfoService: DbProfileInfoService,
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.getCat();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public openAddEventDialog(): void {
    this.dialog.open<ModalAddEventComponent>(ModalAddEventComponent, {
      data: this.dataSource.data
    });
  }

  public openAddCatDialog(): void {
    const dialogRef = this.dialog.open<ModalAddCategoryComponent>(ModalAddCategoryComponent, {
      data: this.dataSource.data
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCat();
      }
    });
  }

  public openEditCatDialog(id: number): void {
    const dialogRef = this.dialog.open<ModalEditCategoryComponent>(ModalEditCategoryComponent, {
      data: {
        categories: this.dataSource.data,
        currentCategory: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        this.getCat();
      }
    }
    );
  }

  public openDeleteCatDialog(id: number): void {
    const dialogRef = this.dialog.open<ModalDeleteCategoryComponent>(ModalDeleteCategoryComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.profileInfoService.deleteCategory(id).subscribe(
          () => this.getCat()
        );
      }
    });
  }

  private getCat(): void {
    this.profileInfoService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: ICategory[]) => {
          this.dataSource = new MatTableDataSource<ICategory>(response);
        });
  }
}
