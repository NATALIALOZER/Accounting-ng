import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    private dialogRef: MatDialogRef<ModalAddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, name: string } = { id: 0, name: ''}
  ) {}

  public closeDialog(): void {
    let addedCategory: boolean = false;
    if (this.form.status === 'VALID') { addedCategory = true; }
    this.dialogRef.close(addedCategory);
  }

  public ngOnInit(): void {
    console.log(this.data)
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
    this.profileInfoService.postNewCategory(cat).pipe(takeUntil(this.destroy$)).subscribe(() => this.closeDialog());
  }

  private getForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      capacity: [ '', [Validators.required]],
    });
  }
}
