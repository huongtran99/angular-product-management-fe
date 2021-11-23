import {Injectable} from '@angular/core';
import {Product} from '../model/product';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProductByName(name: string, page: number): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8080/products?q=${name}&page=${page}`);
  }

  getAll(page: number): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8080/products?page=${page}`);
  }

  saveProduct(product): Observable<Product> {
    return this.http.post<Product>('http://localhost:8080/products', product);
  }

  findProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:8080/products/${id}`);
  }

  editProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`http://localhost:8080/products/${id}`, product);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`http://localhost:8080/products/${id}`);
  }



}
