import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  searchBarControl: FormControl = new FormControl<string>('')

  constructor(private productService: ProductService) {

  }


  ngOnInit(): void {
    this.searchBarControl.valueChanges.subscribe(currentSearchBarData => {
      this.productService.updateSearchTerm(currentSearchBarData)
    })
  }


}
