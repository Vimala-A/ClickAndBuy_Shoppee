import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CatalogueService, Product } from 'src/app/services';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public productForm: FormGroup;
  public categories: string[] = [

    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
  ];
  public isSubmitted: boolean = false;
  public isEditMode: boolean;
  public productId: string;
  public isApiError: boolean;
  public alertMessage: string;
  constructor(private fb: FormBuilder, private catalogueService: CatalogueService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  public ngOnInit(): void {
    this.isEditMode = this.activatedRoute.snapshot.url[0].path.indexOf('edit') !== -1;
    this.buildForm();

  }
  public buildForm(): void {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      category: ['', [Validators.required]],
      image: ['', [Validators.required]]
    });
    if (this.isEditMode) {
      this.setFormData();
    }
  }

  public setFormData(): void {
    this.productId = this.activatedRoute.snapshot.params['productId'];
    if (this.productId) {
      this.subscriptions.push(this.catalogueService.getProductById(this.productId).subscribe((res) => {
        if (res) {
          this.isApiError = false;
          const product: Product = new Product(res);
          this.productForm.setValue({
            title: product?.title,
            description: product?.description,
            price: product?.price,
            category: product?.category,
            image: product?.image
          });
        } else {
          this.isApiError = true;
          this.alertMessage = 'Product Not Found'
        }

      },(err)=> {
        this.isApiError = true;
         this.alertMessage = 'Something went wrong, please try later'
      }));
    }

  }

  public OnImageUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productForm.patchValue({
        image: file.name
      });
    }
  }

  public onSubmit(form: FormGroup): void {
    this.isSubmitted = true;
    if (!form.valid) {
      return;
    }

    if (this.isEditMode) {
      this.updateProduct(form);
    } else {
      this.addProduct(form);
    }
  }

  public addProduct(form: FormGroup): void {
    this.subscriptions.push(this.catalogueService.addProduct(form.value).subscribe((res: Product) => {
      this.catalogueService.newProducts.push(new Product(res));
      this.router.navigate(['products']);
    }));
  }


  public updateProduct(form: FormGroup): void {
    this.subscriptions.push(this.catalogueService.updateProduct(this.productId, form.value).subscribe((res: Product) => {
      this.catalogueService.recentUpdatedProduct = new Product(res);
      this.router.navigate(['products']);
    }));

  }

  get f() {
    return this.productForm.controls;
  }

  public ngOnDestroy(): void {
    this.subscriptions?.forEach(el => el.unsubscribe()); // ClearednSubscriptions
  }

}
