import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isAuthenticated: boolean = false;

  @Output() public toggleSidebar: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  public ngOnInit(): void {
  }

  public signOut(): void {
    this.isAuthenticated = this.authService.signOut();
    this.router.navigate(['/auth/login']);
  }
}
