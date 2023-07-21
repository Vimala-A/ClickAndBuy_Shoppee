import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { CartComponent } from './components/cart/cart.component';
import { AuthGuard } from './services';
import { LoginGuard } from './services/login-guard/login-guard';
import { AdminGuard } from './services/admin-guard/admin-guard';
import { ProductsComponent, ProductDetailComponent, AddEditProductComponent} from './components/products';

const routes: Routes = [
  {path:'', pathMatch: 'full',redirectTo: '/login'},
  {path:'login', component: LoginComponent, canActivate:[LoginGuard]},
  { path: 'products',component: ProductsComponent,
    children: [
      // { path: '', component: ProductsComponent, canActivate:[AuthGuard], pathMatch: 'full'},
      { path: 'detail/:productId', component: ProductDetailComponent,canActivate:[AuthGuard], },
      { path: 'add', component: AddEditProductComponent,canActivate:[AuthGuard, AdminGuard]},
      { path: 'edit/:productId', component: AddEditProductComponent,canActivate:[AuthGuard]}
      
    ]
  },
  {path:'cart', component: CartComponent, canActivate:[AuthGuard]},
  { path:'**', pathMatch: 'full', component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 