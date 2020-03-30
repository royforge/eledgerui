import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { throwError, Observable, from, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { AlertService } from './alert.service';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private notify: AlertService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(tap(event => {
        if (event instanceof HttpResponse && event.status === 201) {
          this.notify.showSuccess("Updated changes" , "Successful");
        }
      }),

        catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            try {
              this.notify.showError(err.error.message, err.status.toString());
            } catch (e) {
              this.notify.showError('An error occurred', '');
            }
            //log error 
          }
          return of(err);
        }));


  };
}