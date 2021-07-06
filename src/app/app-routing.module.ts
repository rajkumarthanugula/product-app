import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductCreateComponent } from './product/components/product-create/product-create.component';
import { ProductListComponent } from './product/components/product-list/product-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'product', pathMatch: 'full' },
  { path: 'product',
   component: AppComponent,
   children: [
  { path: '', redirectTo: 'product-list', pathMatch: 'full' },
  {
    path: 'product-list', component: ProductListComponent
  },
  {
    path: 'product-create', component: ProductCreateComponent
  }
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
