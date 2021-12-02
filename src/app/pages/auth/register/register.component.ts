import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IProfile} from '../../../shared/models/interfaces';
import {Subject, takeUntil} from 'rxjs';
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
    this.getForm();
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }
    const user: IProfile = this.form.value;
    this.isSubmitted = true;
    setTimeout(() => {
      this.jsonDBService.getUser(user)
        .pipe(takeUntil(this.destroy$))
        .subscribe( (response: IProfile[] ) => {
          if (response.length === 0 ) {
            this.jsonDBService.setUser(user)
              .pipe(takeUntil(this.destroy$))
              .subscribe(
                (res: IProfile) => {

                  this.router.navigate(['/auth/login']);
                }
              );
            this.isSubmitted = false;
          } else {
            this.handleError('Этот пользователь уже зарегистрирован');
          }
        });
    }, 2000);
  }

  private getForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required]],
      checkRequired:  [false, [Validators.requiredTrue]]
    });
  }

  private handleError(error: string): void {
    this.message = error;
    setTimeout( () => this.message = '' , 5000);
  }
}
