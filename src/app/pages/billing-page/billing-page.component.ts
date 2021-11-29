import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './billing-page.component.html',
  styleUrls: ['./billing-page.component.scss']
})
export class BillingPageComponent {
  public resetTableSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public resetChildTables(): void {
    this.resetTableSubject.next(true);
  }
}
