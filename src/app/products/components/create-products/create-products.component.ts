import { Component, inject, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../models/Producto';
import { ProductsService } from '../../services/products.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-products',
  standalone: false,
  templateUrl: './create-products.component.html',
  styleUrl: './create-products.component.css'
})
export class CreateProductsComponent {

  // Definir el formulario reactivo
  productForm!: FormGroup;
  //Modo de edicion o creacion
  isEditMode = false;

  private readonly _productService = inject(ProductsService);
  private readonly _toastrService = inject(ToastrService);


  constructor(
    private dialogRef: MatDialogRef<CreateProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    this.productForm = new FormGroup({


      nombre: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required, Validators.min(0)]),
      categoria: new FormControl('', [Validators.required]),
      imagen: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      stock: new FormControl(0, [Validators.required, Validators.min(0)])


    });


    if (this.data) {
      this.productForm.setValue({
        name: this.data.name || '',
        price: this.data.price || 0,
        category: this.data.category || ''
      });
    }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  onSubmit(): void {
    if (this.productForm.valid) {
      const newProduct: Product = this.productForm.value;
      this._productService.createProduct(newProduct).subscribe({
        next: (value) => {
          this.dialogRef.close(value);
          // Mostrar notificación de éxito
        this._toastrService.success('Producto creado con éxito');

          this._productService.getAllProducts();
        },
        error: (err) => {
          console.log('Error al crear el producto', err);
        }
      });
    }
  }



}
