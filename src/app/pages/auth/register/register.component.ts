import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Profile} from '../../../shared/models/interfaces';
import {Subject, takeUntil} from 'rxjs';
import {Router} from '@angular/router';
import {JsonDBService} from '../../../shared/services/json-db.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private jsonDBService: JsonDBService
  ) { }

  public ngOnInit(): void {
    this.getForm();
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
          this.jsonDBService.setUser(user)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              (res: Profile) => {
                const profile = [ `Данные пользователя. email: ${res.email} `, `имя: ${res.name} `, `пароль: ${res.password} `];
                localStorage.setItem('user', profile.toString());
                this.router.navigate(['/home']);
              }
            );
        } else {
          console.log('Этот пользователь уже зарегистрирован');
        }
      });
  }

  public getForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required]],
      checkRequired:  [false, [Validators.requiredTrue]]
    });
  }
}
