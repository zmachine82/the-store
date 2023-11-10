import { Injectable } from '@angular/core';
import { FirebaseProduct, Product } from './product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private allProducts: Product[] = [];
  filteredProducts: Product[] = []

  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get('https://the-store-data-default-rtdb.firebaseio.com/products.json').subscribe((res: any) => {
      this.allProducts = Object.keys(res).map(id => {
        const firebaseProduct: FirebaseProduct = res[id] as FirebaseProduct
        firebaseProduct.id = id;
        return new Product(firebaseProduct)
      })

      this.filteredProducts = this.allProducts
    })
  }

  addProduct(product: FirebaseProduct) {
    this.http.post<{name: string}>('https://the-store-data-default-rtdb.firebaseio.com/products.json', product).subscribe((res) => {
      product.id = res.name
      this.allProducts.push(new Product(product))
    })
  }

  updateSearchTerm(searchTerm: string) {
    // as the search term changes, we want the products array above to only contain things that match the search term
    this.filteredProducts = this.allProducts.filter(product => {
      if (product.matchesSearchTerm(searchTerm)) {
        return true
      } else {
        return false;
      }

    })
  }
}
