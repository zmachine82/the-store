import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseProduct } from '../product';
import { HttpClient } from "@angular/common/http";
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  newProductForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    sellPrice: new FormControl<number>(0.00, [Validators.required, Validators.min(0)]),
    quantity: new FormControl<number>(0, [Validators.required,  Validators.min(0)]),
    image: new FormControl<string>('')
  })

  constructor(private productService: ProductService) {


  }

  ngOnInit() {

  }

  submitForm() {

    this.productService.addProduct(this.newProductForm.value as FirebaseProduct)

  }

  resetForm() {
    this.newProductForm.reset()
  }
}
