import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { CartService, Product } from 'src/app/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  public activeCartItems: Product[]= [];
  public totalCost: number;
  private subscriptions: Subscription[] = [];
  public totalQuantity: number;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.cartService.getCart().subscribe((res: any)=> {
          this.activeCartItems = [];
          console.log('activeCartItems', this.activeCartItems);
          res.forEach((item: any)=> {
            this.activeCartItems.push(new Product(item)) 
          })
      }))
      this.subscriptions.push(this.cartService.cartUpdated.subscribe((res:any)=> {
        console.log('activeCartItems sdsdsdß', this.activeCartItems);

          if(res) {
            this.activeCartItems = [];

            res.forEach((item: any)=> {
              this.activeCartItems.push(new Product(item)) 
            })
          }
          this.getTotalPrice();
          this.totalQuantity = this.cartService.getTotalQuantity();
          
      }))
  }

  public incQuantity(product: Product): void {
    const beforeIncTotal: number = product.price;
    const beforeIncQuantity: number = product.quantity
    product.incQuantity();
    this.totalCost = this.totalCost + product.price;    
    this.totalQuantity = this.totalQuantity + 1;    
  }

  public decQuantity(product: Product): void {
    if(product.quantity <=1) {
      return;
    }
    product.decQuantity();

    this.totalCost = this.totalCost - product.price;
    this.totalQuantity = this.totalQuantity-1;    

  }

  public removeItem(product: Product): void {
    this.cartService.removeItem(product);
  }

  public getTotalPrice(): number {
    this.totalCost = this.cartService.getTotalPrice();
    return this.totalCost;
  }

   public clearCart(): void {
     this.cartService.clearCart();
   }

   public ngOnDestroy(): void {
    this.subscriptions?.forEach( el => el.unsubscribe()); // ClearednSubscriptions
   }
}
