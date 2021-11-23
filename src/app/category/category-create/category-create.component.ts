import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CategoryService} from '../../service/category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
  });

  constructor(private categoryService: CategoryService,
              private router: Router) {
  }

  ngOnInit() {
  }

  submit() {
    const category = this.categoryForm.value;
    this.categoryService.createCategory(category).subscribe(() => {
      this.categoryForm.reset();
      this.router.navigateByUrl('/category/list');
    }, error => {
      alert('Fail!');
    });
  }
}
