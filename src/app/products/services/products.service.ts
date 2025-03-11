import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Producto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly _http=inject(HttpClient);

  constructor() { }

  getAllProducts(): Observable<Product[]> {
      return this._http.get<Product[]>('http://localhost:5217/api/Producto');
  }

  deleteProduct(id: number): Observable<void> {
    return this._http.delete<void>(`${'http://localhost:5217/api/Producto'}/${id}`);
  }

  createProduct(product: Product): Observable<void> {

    return this._http.post<void>('http://localhost:5217/api/Producto/save',product);
  }

  updateProduct(product: Product): Observable<void> {


    return this._http.put<void>(`http://localhost:5217/api/Producto/${product.id}`, product);
  }

}
