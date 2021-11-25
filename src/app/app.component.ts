import {Component} from '@angular/core';
import {AuthService} from './shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public screenWidth: number = 0;

  constructor(
    public auth: AuthService,
    private router: Router
  ) {
      this.screenWidth = window.innerWidth;
      window.onresize = () => {
        this.screenWidth = window.innerWidth;
      };
  }

  public signOut(): void {
    this.router.navigate(['/auth/login']);
    this.auth.signOut();
  }

}
