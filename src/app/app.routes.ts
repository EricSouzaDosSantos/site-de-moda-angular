import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'admin/products',
    component: ProductsComponent,
  },
  {
    path: 'admin/product/new',
    component: ProductEditComponent,
  },
  {
    path: 'admin/product/edit/:id',
    component: ProductEditComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
