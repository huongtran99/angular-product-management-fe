import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {Product} from '../../model/product';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  page: number = 0;
  productFormSearch: FormGroup = new FormGroup({
    q: new FormControl(),
  });
  pagesTotal: any[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.getAll(this.page);
  }

  getAll(page) {
    if (this.productFormSearch.value.q != null && this.productFormSearch.value.q != '') {
      this.productService.getProductByName(this.productFormSearch.value.q, page).subscribe((products: any) => {
        this.products = products.content;
        this.page = products.number;
        this.pagesTotal = [];
        for (let i = 0; i < products.totalPages; i++) {
          this.pagesTotal.push(i);
        }
      });
    } else {
      this.productService.getAll(page).subscribe((products: any) => {
        this.products = products.content;
        this.page = products.number;
        this.pagesTotal = [];
        for (let i = 0; i < products.totalPages; i++) {
          this.pagesTotal.push(i);
        }
      });
    }
  }

  chosePage(pageNumber) {
    this.productService.getAll(pageNumber).subscribe((products: any) => {
      this.products = products.content;
      this.page = products.number;
    });
  }

}
