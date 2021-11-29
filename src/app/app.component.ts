import {Component} from '@angular/core';
import {AuthService} from './shared/services/auth.service';
import {Router} from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      `usd`,
      this.sanitizer.bypassSecurityTrustResourceUrl(`assets/usd.svg`)
    );

    this.matIconRegistry.addSvgIcon(
      `uah`,
      this.sanitizer.bypassSecurityTrustResourceUrl(`assets/uah.svg`)
    );
  }


}
