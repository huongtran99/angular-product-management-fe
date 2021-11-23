import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  id: number;
  constructor(private productService: ProductService,
              private activateRoute: ActivatedRoute,
              private router: Router) {
    this.activateRoute.paramMap.subscribe(paramMap => {
      this.id = +paramMap.get('id');
    });
  }

  ngOnInit() {
  }

  deleteProduct() {
    this.productService.deleteProduct(this.id).subscribe();
    this.router.navigateByUrl('/product/list');
  }

}
