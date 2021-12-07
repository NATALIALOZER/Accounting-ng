import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ICategory } from '../../shared/models/interfaces';
import { Subject, takeUntil } from 'rxjs';
import { DbProfileInfoService } from '../../shared/services/db-profile-info.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddEventComponent } from './modal-add-event/modal-add-event.component';
import { ModalAddCategoryComponent } from './modal-add-category/modal-add-category.component';

@Component({
  selector: 'app-record-page',
  templateUrl: './record-page.component.html',
  styleUrls: ['./record-page.component.scss']
})
export class RecordPageComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) public sort!: MatSort;
  public dataSource!: MatTableDataSource<ICategory>;
  public data: ICategory[] = [];
  public displayedColumns: string[] = ['id', 'name', 'capacity', 'action'];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private profileInfoService: DbProfileInfoService,
    public dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.getCat();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public openAddEventDialog(): void {
    this.dialog.open(ModalAddEventComponent);
  }

  public openAddCatDialog(): void {
    this.dialog.open(ModalAddCategoryComponent);
  }

  private getCat(): void {
    this.profileInfoService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: ICategory[]) => {
          this.data = response;
          this.dataSource = new MatTableDataSource<ICategory>(this.data);
          this.dataSource.sort = this.sort;
        });
  }
}
