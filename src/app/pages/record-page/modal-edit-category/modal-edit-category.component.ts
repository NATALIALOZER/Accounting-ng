import { Component, Inject, NgIterable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { DbProfileInfoService } from '../../../shared/services/db-profile-info.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICategory } from '../../../shared/models/interfaces';

@Component({
  selector: 'app-modal-edit-category',
  templateUrl: './modal-edit-category.component.html',
  styleUrls: ['./modal-edit-category.component.scss']
})
export class ModalEditCategoryComponent implements OnInit {
  public form!: FormGroup;
  public currentCat: ICategory = {capacity: 0, name: '', id: 0};
  private destroy$: Subject<void> = new Subject<void>();


  constructor(
    private formBuilder: FormBuilder,
    private profileInfoService: DbProfileInfoService,
    private dialogRef: MatDialogRef<ModalEditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { categories: ICategory[], currentCategory: number},
  ) {}

  public closeDialog(editCategory: boolean = false): void {
    this.dialogRef.close(editCategory);
  }

  public ngOnInit(): void {
    this.currentCat = this.data.categories.find( i => i.id === this.data.currentCategory) as ICategory;
    this.getForm();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public edit(): void {
    if (this.form.invalid) {
      return;
    }
    const cat = this.data.categories.find(i => i.name === this.form.value.originalName) as ICategory;
    const body = { name: this.form.value.name, capacity: this.form.value.capacity, id: cat.id };
    this.profileInfoService.patchCategory( body )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.closeDialog(true));
  }

  private getForm(): void {
    this.form = this.formBuilder.group({
      originalName: [this.currentCat.name, [Validators.required]],
      name: [this.currentCat.name, [Validators.required]],
      capacity: [ this.currentCat.capacity, [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }
}
