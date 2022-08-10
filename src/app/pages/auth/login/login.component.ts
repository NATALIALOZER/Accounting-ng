import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IProfile} from '../../../shared/models/interfaces';
import {Router} from '@angular/router';
import {AuthService} from '../../../shared/services/auth.service';
import { delay, map, of, Subject, switchMap, takeUntil } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public message: string = '';
  public form!: FormGroup;
  public isSubmitted: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();


  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.buildForm();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.isSubmitted = true;
    this.authService.getUser(this.form.value)
      .pipe(
        map( (response: IProfile[] ) => {
          if (response.length === 0 ) {
            this.handleError('Такого пользователя не существует');
          } else {
            if (response[0].password === this.form.value.password) {
              localStorage.setItem('user', JSON.stringify(response));
              this.authService.isAuthenticated();
              this.router.navigate(['/billing-page']);
            } else {
              this.handleError('Неправильный пароль');
            }
          }
        })
      ).pipe(takeUntil(this.destroy$))
      .subscribe(() => this.isSubmitted = false );
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
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
