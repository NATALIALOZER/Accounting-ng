import { Component} from '@angular/core';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  public name: string = '';
  public email: string = '';

  constructor(
    private authService: AuthService
  ) {
    if (this.authService.getUserData()) {
      this.name = this.authService.getUserData()[0].name as string;
      this.email =  this.authService.getUserData()[0].email;
    }
  }
}
