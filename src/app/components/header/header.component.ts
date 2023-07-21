import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, CartService } from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public userName: string ='';

  constructor(public router: Router, private userService: UserService, private cartService: CartService) { }

  ngOnInit(): void {
    const email = this.userService.getUserEmail();
    this.userName = email ? this.getUserName() : '';
  }

  private getUserName(): string {
    return this.userService.getUserName();
    
  }

  public logOut(): void {
    localStorage.clear();
    this.cartService.resetAll();
    this.router.navigate(['/login'])
  }

}
