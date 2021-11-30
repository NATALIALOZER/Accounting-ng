import {Pipe, PipeTransform} from '@angular/core';
import { EventInfo } from '../models/interfaces';


@Pipe({
  name: 'filterEvents'
})
export class FilterPipe implements PipeTransform {

  public transform(events: EventInfo[], filter: string = ''): EventInfo[] {
    if (!filter.trim()) {
      return events;
    }

    return events.filter(event => {
      return event.category.toLowerCase().includes(filter.toLowerCase());
    });
  }
}
