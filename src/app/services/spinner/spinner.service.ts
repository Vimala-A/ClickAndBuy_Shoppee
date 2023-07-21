import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private count = 0;
  private spinner$ = new BehaviorSubject<string>('');
  // private cartItemsSource: any = new BehaviorSubject(null);

  public getSpinnerObserver: Observable<any> = this.spinner$.asObservable();
  constructor() { }
  // public getSpinnerObserver(): Observable<string> {
  //   return this.spinner$.asObservable();
  // }

  public requestStarted() {
    if (++this.count === 1) {
      this.spinner$.next('start');
    }
  }

  public requestEnded() {
    if (this.count === 0 || --this.count === 0) {
      this.spinner$.next('stop');
    }
  }

  public resetSpinner() {
    this.count = 0;
    this.spinner$.next('stop');
  }
}
