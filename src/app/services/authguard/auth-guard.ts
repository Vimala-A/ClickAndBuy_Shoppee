import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(public router: Router) {}

  public canActivate(): boolean {
    if (Boolean(localStorage.getItem('userEmail'))) {
      return true;
    } else {
      this.router.navigate(['']);
    }
    return Boolean(localStorage.getItem('userEmail'));
  }
}
