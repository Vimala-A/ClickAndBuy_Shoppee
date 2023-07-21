import { Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Product } from 'src/app/services'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItems: Product[] = this.getCartItems();
  // private cartObservableSource: any = new BehaviorSubject(null);
    private cartItemsSource: any = new BehaviorSubject(null);

    public cartUpdated: Observable<any> = this.cartItemsSource.asObservable();
    constructor() {
    this.cartItems = this.getCartItems();
  }

  public getCartItems(): any {
    const cart = localStorage.getItem('cartItems');
    this.cartItems = cart !== null ? JSON.parse(cart) : [];
    this.cartItems.forEach(item=> new Product(item));
    return this.cartItems;

  }

  public getCartItemsCount(): number {
    if(!this.cartItems) {
      this.cartItems = this.getCartItems();
    }
     return this.cartItems.length;
  }

  public postCart(product: Product): void {
    this.cartItems.push(product);
    this.setCartInStorage();
    this.cartItemsSource.next(this.cartItems)
  }
  public removeItem(product: Product): void {
    this.cartItems.map((item, index)=> {
      if(item.id === product.id) {
        this.cartItems.splice(index, 1);
      }
    })
    this.setCartInStorage();  // During page efresh to avoid data, storing cart items in the localStorage
    this.cartItemsSource.next(this.cartItems)
  }

  public clearCart(): void {
    this.cartItems = [];
    localStorage.removeItem('cartItems');
    this.cartItemsSource.next(this.cartItems)

  }
  
  public getCart(): any {
    if(this.cartItems) {
      return of(this.cartItems);
    }
    return this.cartItemsSource.asObservable()
  }

  public getTotalPrice(): number {
    let totalPrice: number = 0;
    this.cartItems.map((item)=> {
        totalPrice += item.total;
    })
    return totalPrice;
  }

  public getTotalQuantity(): number {
    let totalQuantity: number = 0;
    this.cartItems.map((item)=> {
        totalQuantity += item.quantity;
    })
    return totalQuantity;
  }

  private setCartInStorage(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  public resetAll(): void {
    this.cartItems = [];
  }
}
