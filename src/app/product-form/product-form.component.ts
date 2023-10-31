import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product';

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

  ngOnInit() {
  }

  submitForm() {
    console.log(this.newProductForm.value as Product)

  }

  resetForm() {
    this.newProductForm.reset()
  }
}
