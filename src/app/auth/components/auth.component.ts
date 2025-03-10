import { Product } from './../models/Product';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm!:FormGroup;

  public products: Product[] = [];

  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly _formBuilder = inject(FormBuilder);

  constructor() {

    this.loginForm = this._formBuilder.group({
      login: ['', Validators.required],
      password_user: ['', [Validators.required, Validators.minLength(3)]]
    });
  }



  ngOnInit(): void {
    this.getProduct();
  }


  getProduct() {
    this._authService.getAllProducts().subscribe({
      next: (products: Product[]) => {  // Asegúrate de que se maneja como Product[]
        console.log(products);
        this.products = products;  // Aquí estás actualizando la lista de productos
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
      complete: () => {
        console.log('Petición completada');
      },
    });
  }

  login(){

    try {
      if (this.loginForm.valid) {
        const { login, password_user } = this.loginForm.value;
        console.log(login, password_user);
        this._authService.login(this.loginForm.value).subscribe({
          next(value) {

          },
          error(err) {

          },
        })



      } else {

      }

    } catch (error) {

    }

  }


}
