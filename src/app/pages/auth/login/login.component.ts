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
          const existUser = response.find( (profile: Profile) => {
            return profile.password === user.password && profile.username === user.username;
          });
          if (existUser) {
            this.router.navigate(['/home']);
          } else {
            this.loginError();
          }
        }
      );
  }

  public loginError(): any {
    /*Обработка неправильно введенного пароля*/
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
}
