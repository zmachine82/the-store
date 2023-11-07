import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {path: 'admin', children: [
    {path: 'add-products', component: ProductFormComponent}
  ], canActivateChild: [authGuard()]},

  {path: '', component: ProductListComponent},
  {path: 'sign-in', component: SignInComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
