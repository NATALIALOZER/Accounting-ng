import { Component, Inject , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { DbProfileInfoService } from '../../../shared/services/db-profile-info.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICategory } from '../../../shared/models/interfaces';
import { toNumbers } from '@angular/compiler-cli/src/diagnostics/typescript_version';

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
    @Inject(MAT_DIALOG_DATA) public data: { categories: ICategory[], currentCategory: ICategory},
  ) {}

  public closeDialog(editCategory: boolean = false): void {
    this.dialogRef.close(editCategory);
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  public changeValue(value: string): void {
    const currentValue = this.data.categories.find(category => category.name === value) as ICategory;
    this.form.patchValue({
      id: currentValue.id,
      name: currentValue.name,
      capacity: currentValue.capacity
    });
  }

  public edit(): void {
    if (this.form.invalid) {
      return;
    }
    delete this.form.value['currentCategory'];
    this.profileInfoService.updateCategory({
      ...this.form.value,
      capacity: Number(this.form.value.capacity)
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.closeDialog(true));
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      id: [this.data.currentCategory.id],
      currentCategory: [this.data.currentCategory.name, [Validators.required]],
      name: [this.data.currentCategory.name, [Validators.required]],
      capacity: [ this.data.currentCategory.capacity, [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }
}
