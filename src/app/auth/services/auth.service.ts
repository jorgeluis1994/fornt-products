import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Product } from '../models/Product';
import { Token } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly tokenSubject =new BehaviorSubject<string>(null!);

  private readonly _http=inject(HttpClient);

  constructor() {
    const saveToken=localStorage.getItem('accessToken');
    if(saveToken){
      this.tokenSubject.next(saveToken);
    }
  }

  login(credentials: { login: string; password_user: string }):Observable<Token>{

    return this._http.post<Token>('http://localhost:6200/auth/login',credentials).pipe(
      tap((response)=>{
        this.setToken(response.access_token);
      })
    )

  }

   // 🔹 Guardar el token en memoria y en localStorage
  private setToken(token: string) {
    this.tokenSubject.next(token);
    sessionStorage.setItem('accessToken', token);
  }

  private verifyTokenStatus(): boolean {
    return !!sessionStorage.getItem('accessToken'); // Devuelve true si existe el token, false si no
  }



  getAllProducts(): Observable<Product[]> {
    return this._http.get<Product[]>('https://fakestoreapi.com/products');
  }






}
