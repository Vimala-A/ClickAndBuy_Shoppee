import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public router: Router) { }

  public canActivate(): boolean {
    const isAdmin: boolean = localStorage.getItem('isAdmin') ? localStorage.getItem('isAdmin')==='true' : false;
    if (isAdmin) {
      return true;
    } else {
      this.router.navigate(['/products']);
    }
    return isAdmin;
  }
}
