import { Component, Input} from '@angular/core';
import { EventInfo, RateTableData } from '../../../shared/models/interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() public dataSource: EventInfo[] = [];
  public displayedColumns: string[] = ['id', 'amount', 'date', 'category', 'type', 'action'];
  public search: string = '';
}
