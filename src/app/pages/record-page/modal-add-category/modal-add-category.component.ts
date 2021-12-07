import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-add-category',
  templateUrl: './modal-add-category.component.html',
  styleUrls: ['./modal-add-category.component.scss']
})
export class ModalAddCategoryComponent implements OnInit {

  public form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ModalAddCategoryComponent>
  ) {}

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public ngOnInit(): void {
    this.getForm();
  }

  public add(): void {
    console.log(this.form);
  }

  private getForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      capacity: [ '', [Validators.required]],
    });
  }

}
