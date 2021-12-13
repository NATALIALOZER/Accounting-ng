import { Component, Inject , OnInit } from '@angular/core';
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
    this.currentCat = this.data.categories.find( category => category.id === this.data.currentCategory) as ICategory;
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
    this.form.value.id = (this.data.categories.find(category => category.name === this.form.value.id) as ICategory).id;
    this.profileInfoService.updateCategory( this.form.value )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.closeDialog(true));
  }

  private getForm(): void {
    this.form = this.formBuilder.group({
      id: [this.currentCat.name, [Validators.required]],
      name: [this.currentCat.name, [Validators.required]],
      capacity: [ this.currentCat.capacity, [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }
}
