import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Profile} from '../../../shared/models/interfaces';
import {Router} from '@angular/router';
import {JsonDBService} from '../../../shared/services/json-db.service';
import {Subject, takeUntil} from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public message: string = '';
  public form!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private jsonDBService: JsonDBService,
  ) { }

  public ngOnInit(): void {
    this.getForm();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }
    const user: Profile = this.form.value;
    this.jsonDBService.getUser(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe( (response: Profile[] ) => {
        if (response.length === 0 ) {
          this.handleError('email_error');
        } else {
          const existUser = response.find( (profile: Profile) => {
            return profile.password === user.password && profile.name === user.name;
          });
          if (existUser) {
            this.router.navigate(['/home']);
          } else {
            this.handleError('password_error');
          }
        }
      }
    );
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  private handleError(error: string): string {
    switch (error) {
      case 'email_error':
        this.message = 'Пользователя с таким email не существует';
        break;
      case 'password_error':
        this.message = 'Неправильный пароль';
        break;
      default:
        break;
    }
    return this.message;
  }
}
