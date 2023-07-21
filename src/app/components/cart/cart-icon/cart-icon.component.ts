import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router} from '@angular/router';
import { CartService } from 'src/app/services';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent implements OnInit, OnDestroy {
  public cartCount: number = 0;
  private subscription: Subscription;
  constructor(public cartService: CartService, private router: Router) { }

  public ngOnInit(): void {
    this.subscription = (this.cartService.cartUpdated.subscribe((res:any)=> {
      if(res) {
              this.cartCount = res?.length;
      }
    }));
    this.cartCount = this.cartCount ? this.cartCount: this.cartService.getCartItemsCount();
  }

  public goToCart(): void {
    this.router.navigate(['cart']);
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
   }

}
