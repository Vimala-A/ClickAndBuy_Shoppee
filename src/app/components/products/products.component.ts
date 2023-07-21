import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CatalogueService } from '../../services/catalogue';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  // public products: Product[] = [];
  public products$:Observable<any>;
  
  constructor(public catalogueService: CatalogueService) { 
    // console.log('productconstructor')
  }

  ngOnInit(): void {
    // NOTE: FORMAL WAY: TO get API. 
    // this.catalogueService.getProducts().subscribe((res: Product[]) => {
    //   this.products = res;
    // })

    // NOTE: HERE we are using asyc pipe to get API data
    // console.log('productoninit');
    this.getProducts();
  }

  public getProducts(): void {
    this.products$ =this.catalogueService.getProducts(); 
  }

  public deleteProduct(productId: number): void {
    if (productId) {
      this.subscription = this.catalogueService.deleteProduct(productId).subscribe(_ => {
        this.catalogueService.products.map((item, index)=> {
          if(item.id === productId) {
            this.catalogueService.products.splice(index, 1);
          }
        })
      })
    }
  }

  public ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe(); // ClearednSubscription
    }
   }

}
