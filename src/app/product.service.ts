import { Injectable } from '@angular/core';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = []

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get('https://the-store-data-default-rtdb.firebaseio.com/products.json').subscribe((res: any) => {
      this.products = Object.keys(res).map(id => {
        const firebaseProduct: Product = res[id] as Product
        firebaseProduct.id = id;
        return firebaseProduct
      })
    })
  }

  addProduct(product: Product) {
    this.http.post('https://the-store-data-default-rtdb.firebaseio.com/products.json', product).subscribe((res: any) => {
      console.log(res)
      product.id = res.name
      this.products.push(product)
    })
  }
}
