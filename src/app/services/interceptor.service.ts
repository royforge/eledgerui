import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { throwError, Observable, from, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(public toastrService: ToastrService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(tap(event => {
        if (event instanceof HttpResponse && event.status === 201) {
          this.toastrService.success("Updated changes" , "Successful", { positionClass: 'toast-top-right' });
        }
      }),

        catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            try {
              this.toastrService.error(err.error.message, err.status.toString() , { positionClass: 'toast-top-right' });
            } catch (e) {
              this.toastrService.error('An error occurred', '', { positionClass: 'toast-top-right' });
            }
            //log error 
          }
          return of(err);
        }));


  };
}