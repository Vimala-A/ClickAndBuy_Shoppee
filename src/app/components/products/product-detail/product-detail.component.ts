import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogueService, Product, CartService} from '../../../services';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public productId: string;
  public product: Product = new Product();
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private catalogueService: CatalogueService,
    private cartService: CartService) {
      console.log('Detailconstructor');
     }

  ngOnInit(): void {
    console.log('Detailconstructor');
    this.productId = this.activatedRoute.snapshot.params['productId'];
    this.getProductDetails();
  }

  private getProductDetails(): void {
    this.subscription = this.catalogueService.getProductById(this.productId).subscribe((res)=> {
      if (this.catalogueService.recentUpdatedProduct && this.catalogueService.recentUpdatedProduct?.id === res?.id) {
        this.product = this.catalogueService.recentUpdatedProduct;
      } else {
        this.product = new Product(res);
      }
    })
  }

  public incQuantity(): void {
    this.product.incQuantity();
  }

  public decQuantity(): void {
    this.product.decQuantity();
  }

  public addToCart(product: Product): void {
    // localStorage.setItem('cartItems', JSON.stringify([this.product]))
    this.cartService.postCart(product);
    this.router.navigateByUrl(`/cart`);
  }

  public ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe(); // ClearednSubscription
    }
  }
}
