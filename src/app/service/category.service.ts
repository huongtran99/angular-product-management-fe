import {Injectable} from '@angular/core';
import {Category} from '../model/category';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:8080/categories');
  }

  createCategory(category): Observable<Category> {
    return this.http.post<Category>('http://localhost:8080/categories', category);
  }

  editCategory(id: number, category: Category): Observable<Category>  {
    return this.http.put<Category>(`http://localhost:8080/categories/${id}`, category);
  }

  findCategoryById(id: number): Observable<Category>  {
    return this.http.get<Category>(`http://localhost:8080/categories/${id}`);
  }

  deleteCategory(id: number): Observable<Category>  {
    return this.http.delete(`http://localhost:8080/categories/${id}`);
  }

}
