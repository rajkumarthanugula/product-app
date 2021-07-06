import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  page: number = 1;
  productList: Array<Product>;
  productDetails: Product;
  SearchName: string = '';
  locations: Array<String>;
  locatioSearch: string = '';
  productData: Array<Product>;
  private unsubscribe = new Subject<void>();
  productSubscription!: Subscription;
  constructor(
    private http: HttpClient,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productList = [];
    this.productData = [];
    this.locations = ['All', 'Hyderabad', 'Chennai', 'Pune', 'Bangloor'];
    // get list of data
    this.http.get('../../../../assets/product-data.json').subscribe((response: any) => {
      this.productList = response.productList;
      this.productData = response.productList;
      // new Record add/ edit from create/edit mode
      this.productSubscription = this.productService.selectetProductValue$.pipe(takeUntil(this.unsubscribe)).subscribe(res => {
        if (res) {
          const data = res;
          // data.productId = res.productId > 0 ? res.productId : this.productList[this.productList.length - 1].productId + 1;
          data.productId > 0 ?
            this.productList.splice(this.productList.findIndex(e => e.productId === res.productId), 1, res) :
            data.productId = res.productId > 0 ? res.productId : this.productList[this.productList.length - 1].productId + 1,
            this.productList.push(data);
        }
      });
    }, (err) => {
      // when error will come show
      alert('Please try Again...');
    });
  }
  // location selection based finter
  onSelectLocation(value: string): void {
    this.productList = [];
    if (this.locatioSearch === 'All') {
      this.productList = this.productData;
    } else {
      this.productList = this.productData.filter(ele => ele.location === this.locatioSearch);
    }
  }
  // view data
  viewProductDetails(data: Product): void {
    this.productDetails = data;
  }
  // edit data
  editProductDetails(data: Product): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    const obj = {
      productId: data.productId,
      productName: data.productName,
      productPrice: data.productPrice,
      description: data.description,
      quantity: data.quantity,
      location: data.location,
    };
    this.productService.editVendors(obj);
    this.router.navigate(['/product/product-create']);
  }
  // onclick create button
  createProduct(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    const obj = {
      productId: 0,
      productName: '',
      productPrice: '',
      description: '',
      quantity: '',
      location: '',
    };
    this.productService.editVendors(obj);
    this.router.navigate(['/product/product-create']);
  }
  ngOnDestroy(): void {
    this.unsubscribeData(this.productSubscription);
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  private unsubscribeData(subscription: Subscription): void {
    if (subscription && !subscription.closed) {
      subscription.unsubscribe();
    }
  }
}
