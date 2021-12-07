import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Injectable} from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  private baseUrl = environment.baseUrl;
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.responseType !== 'text') {
      const apiReq = request.clone({ url: `${this.baseUrl}${request.url}`});
      return next.handle(apiReq);
    } else {
      return next.handle(request);
    }
  }
}
