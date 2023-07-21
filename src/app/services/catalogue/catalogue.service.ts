import { Injectable } from '@angular/core';
import { observable, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { MockProducts } from './product-mock-data';
import { UserService } from '../user'

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  public products: Product[] = [];
  public newProducts: Product[] = [];
  public recentUpdatedProduct: any = null;
  constructor(private http: HttpClient, private userService: UserService) { }

  // GET Products DATA
  public getProducts(): Observable<Product[]> {
    this.products = [];

    return this.http.get('https://fakestoreapi.com/products').pipe(
      map((res: any) => {
        res.map((item: any) => {
          this.products.push(new Product(item));
        });
        console.log('pdd', this.products);
        console.log('this.products BEFORE COMNCE', this.products.length)
        if (this.userService.isAdminUser()) {
          if (this.newProducts.length) {
            this.products.unshift(...this.newProducts);
            this.newProducts = [];
            console.log('this.products NEWLY ADDEd', this.products.length);
          }
          if (this.recentUpdatedProduct instanceof Product) {
            this.products.map((item, index) => {
              if (item.id === this.recentUpdatedProduct.id) {
                this.products[index] = this.recentUpdatedProduct;
              }
            })
          }

        }
        return this.products;
      }), catchError(err => {
        // NOTE: fakestores domain could be down sometimes. During that time, to get the data, used mock response when server down status received
        if (err.status === 0 && err.statusText === "Unknown Error") {
          return of(MockProducts)
        }
        return of(err);
      })
    )
  }

  public getProductById(productId: string): Observable<any> {
    return this.http.get(`https://fakestoreapi.com/products/${productId}`);
  }

  public addProduct(payload: object): Observable<any> {
    return this.http.post(`https://fakestoreapi.com/products`, payload);
  }

  public updateProduct(id: string, payload: object): Observable<any> {
    return this.http.put(`https://fakestoreapi.com/products/${id}`, payload);
  }

  public deleteProduct(id: number): Observable<any> {
    return this.http.delete(`https://fakestoreapi.com/products/${id}`);
  }
}
