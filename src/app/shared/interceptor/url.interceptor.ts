import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, tap} from 'rxjs';

export class UrlInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newRequest = req.clone({
      headers: req.headers.set(
       'Authorization',
       'token-here'
      )
    });

    return next.handle(newRequest).pipe(tap(
      (success: any) => {
        console.log(success);
      },
      (err: any) => {
        console.log(err);
      }
    ));
  }
}
