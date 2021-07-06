import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // new Data Binding
  private productSource = new BehaviorSubject<Product | undefined>(undefined);
  selectetProductValue$ = this.productSource.asObservable();

  // edit Data binding
  private editproductSource = new BehaviorSubject<any | undefined>(undefined);
  selectetEditProductValue$ = this.editproductSource.asObservable();

  addVendors(data?: Product): void {
    this.productSource.next(data);
  }



  editVendors(data?: any): void {
    this.editproductSource.next(data);
  }
}
