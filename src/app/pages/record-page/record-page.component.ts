import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ICategory } from '../../shared/models/interfaces';
import { Subject, takeUntil } from 'rxjs';
import { DbProfileInfoService } from '../../shared/services/db-profile-info.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddEventComponent } from './modal-add-event/modal-add-event.component';
import { ModalAddCategoryComponent } from './modal-add-category/modal-add-category.component';

@Component({
  selector: 'app-record-page',
  templateUrl: './record-page.component.html',
  styleUrls: ['./record-page.component.scss']
})
export class RecordPageComponent implements OnInit {
  public dataSource!: MatTableDataSource<ICategory>;
  public data: ICategory[] = [];
  public displayedColumns: string[] = ['id', 'name', 'capacity', 'action'];
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

  /*public edit(id: number): void {
     this.profileInfoService.patchCategory(id, )
   }*/

  public delete(id: number): void {
    this.profileInfoService.deleteCategory(id).subscribe(
      () => this.getCat()
    );
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
