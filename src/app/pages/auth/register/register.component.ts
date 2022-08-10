import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IProfile} from '../../../shared/models/interfaces';
import {
  delay,
  of,
  Subject,
  switchMap,
  takeUntil,
  throwError
} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form!: FormGroup;
  public message: string = '';
  public isSubmitted: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private jsonDBService: AuthService
  ) { }

  public ngOnInit(): void {
    this.buildForm();
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.isSubmitted = true;
    delete this.form.value.checkRequired;
    this.jsonDBService.getUser(this.form.value)
      .pipe( switchMap((response: IProfile[]) => {
        if ( response.length !== 0) {
          return throwError('Этот пользователь уже зарегистрирован');
        } else {
          return this.jsonDBService.setUser(this.form.value);
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe(
      () => this.router.navigate(['/auth/login']),
      error => {
        this.isSubmitted = false;
        this.handleError(error);
      }
    );
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required]],
      checkRequired:  [false, [Validators.requiredTrue]]
    });
  }

  private handleError(error: string): void {
    this.message = error;
    of(error).pipe(
      delay(5000),
      switchMap(() => of('')),
      takeUntil(this.destroy$)
    ).subscribe(n => this.message = n);
  }
}
