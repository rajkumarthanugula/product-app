import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit, OnDestroy {
createProductForm: FormGroup;
mode: string = 'Add';
producId: number;
  locations: Array<String>;
  private unsubscribe = new Subject<void>();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private productService: ProductService
  ) { }


  ngOnInit(): void {
    this.locations = ['Hyderabad', 'Chennai', 'Pune', 'Bangloor'];
    this.createProductForm = this.formBuilder.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      quantity: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      location: ['', Validators.required]
    });
    this.productService.selectetEditProductValue$.pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      if (res) {
        this.mode =  res.productId > 0 ? 'Edit' : 'Create';
        this.producId = res.productId;
        this.createProductForm.get('productName').setValue(res.productName);
        this.createProductForm.get('description').setValue(res.description);
        this.createProductForm.get('price').setValue(res.productPrice);
        this.createProductForm.get('quantity').setValue(res.quantity);
        this.createProductForm.get('location').setValue(res.location);
      }
    });
  }
  navigationUrl(): void {
    this.router.navigate(['/product/product-list']);
  }
  onClickCancel(): void {
    this.navigationUrl();
  }
  onSubmit(): void {
    const obj = {
      productId: (this.mode === 'Edit') ? this.producId : 0,
        productName: this.createProductForm.getRawValue().productName,
        productPrice: this.createProductForm.getRawValue().price,
        description: this.createProductForm.getRawValue().description,
        quantity: this.createProductForm.getRawValue().quantity,
        location: this.createProductForm.getRawValue().location,
            };
    this.productService.addVendors(obj);
    this.navigationUrl();
  }
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
