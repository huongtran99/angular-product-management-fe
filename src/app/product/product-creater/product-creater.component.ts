import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {Router} from '@angular/router';
import {CategoryService} from '../../service/category.service';
import {Category} from '../../model/category';
import {ImageService} from '../../service/image.service';

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
  fileData: File[] = [];
  categories: Category[] = [];

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private imageService: ImageService,
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
    };
    this.productService.saveProduct(product).subscribe((product1) => {
      product.id = product1.id;
      const formData = new FormData();
      for (let i = 0; i < this.fileData.length; i++) {
        formData.append('fileName', this.fileData[i]);
      }
      formData.append('product.id', product.id);
      this.imageService.createImage(formData).subscribe();
      this.productForm.reset();
      this.router.navigateByUrl('/product/list');
    }, error => {
      alert('Fail!');
    });
  }

  fileProgress(fileInput: any) {
    for (let i = 0; i < fileInput.target.files.length; i++) {
      this.fileData.push(fileInput.target.files[i]);
    }
  }

}
