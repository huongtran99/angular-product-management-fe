import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../service/category.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {Category} from '../../model/category';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  categoryForm: FormGroup;
  category: Category;
  id: number;

  constructor(private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.categoryService.findCategoryById(this.id).subscribe(category => {
        this.category = category;
        this.categoryForm = new FormGroup({
          id: new FormControl(this.category.id),
          name: new FormControl(this.category.name),
        });
      });
    });
  }

  ngOnInit() {
  }

  updateCategory() {
    let category = this.categoryForm.value;
    this.categoryService.editCategory(this.id, category).subscribe();
    alert('Cập nhật thành công');
  }

}
