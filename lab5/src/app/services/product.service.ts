import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/iproduct';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: string = 'http://localhost:3005/products';
  constructor(public http: HttpClient) {}

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseUrl);
  }

  getProductById(productId: any): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}/${productId}`);
  }
  addNewProduct(product: any) {
    return this.http.post(this.baseUrl, product);
  }

  editProduct(productId: any, product: any) {
    return this.http.put(`${this.baseUrl}/${productId}`, product);
  }
  deleteProduct(productId: any) {
    return this.http.delete(`${this.baseUrl}/${productId}`);
  }
}
