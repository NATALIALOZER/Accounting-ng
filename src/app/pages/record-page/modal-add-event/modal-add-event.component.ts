import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDialogFormData } from '../../../shared/models/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-add-event',
  templateUrl: './modal-add-event.component.html',
  styleUrls: ['./modal-add-event.component.scss']
})
export class ModalAddEventComponent implements OnInit {
  public form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDialogFormData,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ModalAddEventComponent>
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
      category: ['', [Validators.required]],
      type: [ 'income', [Validators.required]],
      amount: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }
}
