import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor( private router: Router,  private userService: UserService) {}
  
  // Saved login email name in the localstorage
  public signIn(loginForm: NgForm): void {
    if (!loginForm.valid) {
      return;
    }
    localStorage.setItem('userEmail',loginForm.value?.email);
    this.userService.userEmail = loginForm.value?.email;
    this.router.navigate(['products']);
  }

}
