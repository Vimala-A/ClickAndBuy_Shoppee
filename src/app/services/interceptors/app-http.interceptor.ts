import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, tap} from "rxjs/operators";
import { SpinnerService } from '../spinner';
@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerService.requestStarted();
    return this.handler(next, request);
  }

  handler(next: HttpHandler, request: HttpRequest<unknown>) {
    return next.handle(request).pipe(tap(
        (event)=> {
            if(event instanceof HttpResponse) {
                this.spinnerService.requestEnded();
            }
        }, (error: HttpErrorResponse) => {
            this.spinnerService.resetSpinner();
            if( [500,400,404].includes(error.status)) {
                    console.error('API Failure ')
            }
            throw error;
        }
    ))
  }
}
