import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CategoryService} from '../../service/category.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Category} from '../../model/category';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent implements OnInit {
  categoryForm: FormGroup;
  id: number;
  category: Category = {};

  constructor(private categoryService: CategoryService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.categoryService.findCategoryById(this.id).subscribe(category => {
        this.category = category;
      });
      this.categoryForm = new FormGroup({
        id: new FormControl(this.category.id),
        name: new FormControl(this.category.name),
      });
    });
  }

  ngOnInit() {
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe();
    this.router.navigate(['/category/list']);
  }

}
