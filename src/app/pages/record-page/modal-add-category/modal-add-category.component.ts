import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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

  public ngOnInit(): void {
    this.buildForm();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public closeDialog(addedCategory: boolean = false): void {
    this.dialogRef.close(addedCategory);
  }

  public add(): void {
    if (this.form.invalid) {
      return;
    }
    this.form.value.capacity = +this.form.value.capacity;
    this.profileInfoService.createCategory(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() =>
        this.closeDialog(true));
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      capacity: [ '', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }
}
