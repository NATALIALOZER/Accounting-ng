import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEventInfo } from '../../../shared/models/interfaces';
import { DbProfileInfoService } from '../../../shared/services/db-profile-info.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-modal-add-event',
  templateUrl: './modal-add-event.component.html',
  styleUrls: ['./modal-add-event.component.scss']
})
export class ModalAddEventComponent implements OnInit {
  public form!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();


  constructor(
    private formBuilder: FormBuilder,
    private profileInfoService: DbProfileInfoService,
    private dialogRef: MatDialogRef<ModalAddEventComponent>
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
    const event: IEventInfo = this.form.value;
    this.profileInfoService.postNewEvent(event).pipe(takeUntil(this.destroy$)).subscribe();
    this.closeDialog();
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
