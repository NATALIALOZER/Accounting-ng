import { Component} from '@angular/core';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
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
