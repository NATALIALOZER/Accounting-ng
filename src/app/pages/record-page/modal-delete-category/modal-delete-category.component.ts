import { Component, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { DbProfileInfoService } from '../../../shared/services/db-profile-info.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-delete-category',
  templateUrl: './modal-delete-category.component.html',
  styleUrls: ['./modal-delete-category.component.scss']
})
export class ModalDeleteCategoryComponent {
  private destroy$: Subject<void> = new Subject<void>();
  constructor(
    private profileInfoService: DbProfileInfoService,
    private dialogRef: MatDialogRef<ModalDeleteCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string, id: number }
  ) { }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public closeDialog(delCategory: boolean = false): void {
    this.dialogRef.close(delCategory);
  }

  public delete(): void {
    this.closeDialog(true);
  }
}
