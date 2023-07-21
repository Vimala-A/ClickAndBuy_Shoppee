import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductComponent } from './components/products/product/product.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';

import { AppHttpInterceptor } from './services/interceptors/app-http.interceptor';
import { CartIconComponent } from './components/cart/cart-icon/cart-icon.component';
import { AddEditProductComponent } from './components/products/add-edit-product/add-edit-product.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { RatingTextConverterPipe } from './pipes/rating-text-converter.pipe';
import { RatingHighlighterDirective } from './directive/rating-highlighter.directive';
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsComponent,
    PagenotfoundComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    ProductDetailComponent,
    CartComponent,
    CartIconComponent,
    AddEditProductComponent,
    SpinnerComponent,
    RatingTextConverterPipe,
    RatingHighlighterDirective
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AppHttpInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
