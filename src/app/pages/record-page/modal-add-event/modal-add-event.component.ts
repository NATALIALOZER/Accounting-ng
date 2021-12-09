import { Component, Inject, NgIterable, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategory, IEventInfo } from '../../../shared/models/interfaces';
import { DbProfileInfoService } from '../../../shared/services/db-profile-info.service';
import { Subject, takeUntil } from 'rxjs';
import * as moment from 'moment';
import 'moment/locale/ru'; // without this line it didn't work
moment.locale('ru');

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
    private dialogRef: MatDialogRef<ModalAddEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NgIterable<ICategory>
  ) {}

  public closeDialog(addedEvent: boolean = false): void {
    this.dialogRef.close(addedEvent);
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
    event.date = String(`${moment().format('l')} ${moment().format('LTS')}`);
    this.profileInfoService.postNewEvent(event)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.closeDialog(true));
  }

  private getForm(): void {
    this.form = this.formBuilder.group({
      category: ['', [Validators.required]],
      type: [ 'income', [Validators.required]],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      description: ['', [Validators.required]]
    });
  }
}
