import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  }, // Protect the dashboard route
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  //{
    //path: 'add-product',
    //component: AddProductComponent,
    //canActivate: [AuthGuard],
  //},
  //{
    //path: 'product-list',
    //component: ProductListComponent, // Add a route for ProductListComponent
  //},
  //{
    //path: 'edit-product/:id',
    //component: EditProductComponent,
    //canActivate: [AuthGuard],
  //},
  //{
    //path: 'edit-product/:id',
    //component: EditProductComponent,
    //canActivate: [AuthGuard],
  //},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
