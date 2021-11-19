import { Component, OnInit } from '@angular/core';
import {Profile} from '../../../shared/models/interfaces';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form!: FormGroup;
  public checkAgreeControl = new FormControl(false);
  private submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required]],
      hideRequired: this.checkAgreeControl
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: Profile = this.form.value;
  }

}
