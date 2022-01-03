import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IProfile} from '../../../shared/models/interfaces';
import {
  concatMap,
  of,
  Subject,
  switchMap,
  takeUntil,
  throwError,
  timer
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
    const user: IProfile = this.form.value;
    const checkUser$ = this.jsonDBService.getUser(user);
    this.isSubmitted = true;
    checkUser$.pipe(
      concatMap((response: IProfile[]) => {
        if ( response.length !== 0) {
          return throwError('Этот пользователь уже зарегистрирован');
        } else {
          return this.jsonDBService.setUser(user);
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe(
      () => this.router.navigate(['/auth/login']),
      error => {
        this.isSubmitted = false;
        this.handleError(error);
      },
      () => this.isSubmitted = false
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
    timer(5000).pipe(
      switchMap(() => of('')),
      takeUntil(this.destroy$)
    ).subscribe(n => this.message = n);
  }
}
