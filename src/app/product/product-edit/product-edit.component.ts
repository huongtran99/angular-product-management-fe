import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {Product} from '../../model/product';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    description: new FormControl(),
    category: new FormControl()
  });
  product: Product;
  id: number;

  constructor(private productService: ProductService,
              private activateRoute: ActivatedRoute,
              private router: Router) {
    this.activateRoute.paramMap.subscribe(paramMap => {
      this.id = +paramMap.get('id');
      this.productService.findProductById(this.id).subscribe(product => {
        this.product = product;
        this.productForm = new FormGroup({
          id: new FormControl(this.product.id),
          name: new FormControl(this.product.name),
          description: new FormControl(this.product.description),
          price: new FormControl(this.product.price),
          category: new FormControl(this.product.category),
        })
      });
    });
  }

  editProduct() {
    this.productService.editProduct(this.id, this.productForm.value).subscribe();
    this.router.navigateByUrl('/product/list');
  }

  ngOnInit() {
  }

}
