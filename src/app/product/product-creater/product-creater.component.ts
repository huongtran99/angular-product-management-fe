import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {Router} from '@angular/router';
import {CategoryService} from '../../service/category.service';
import {Category} from '../../model/category';

@Component({
  selector: 'app-product-creater',
  templateUrl: './product-creater.component.html',
  styleUrls: ['./product-creater.component.css']
})
export class ProductCreaterComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    name: new FormControl(),
    price: new FormControl(),
    description: new FormControl(),
    category: new FormControl()
  });
  categories: Category[] = [];

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });
  }

  submit() {
    let product = this.productForm.value;
    product.category = {
      id: product.category
    }
    this.productService.saveProduct(product).subscribe(() => {
      this.productForm.reset();
      this.router.navigateByUrl('/product/list');
    }, error => {
      alert('Fail!');
    });
  }

}
