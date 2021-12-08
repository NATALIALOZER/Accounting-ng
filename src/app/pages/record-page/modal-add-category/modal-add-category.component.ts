import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ICategory } from '../../../shared/models/interfaces';
import { Subject, takeUntil } from 'rxjs';
import { DbProfileInfoService } from '../../../shared/services/db-profile-info.service';

@Component({
  selector: 'app-modal-add-category',
  templateUrl: './modal-add-category.component.html',
  styleUrls: ['./modal-add-category.component.scss']
})
export class ModalAddCategoryComponent implements OnInit {
  public form!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private profileInfoService: DbProfileInfoService,
    private dialogRef: MatDialogRef<ModalAddCategoryComponent>
  ) {}

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public ngOnInit(): void {
    this.getForm();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public add(): void {
    if (this.form.invalid) {
      return;
    }
    const cat: ICategory = this.form.value;
    this.profileInfoService.postNewCategory(cat).pipe(takeUntil(this.destroy$)).subscribe();
    this.closeDialog();
  }

  private getForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      capacity: [ '', [Validators.required]],
    });
  }
}
