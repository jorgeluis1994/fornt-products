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
    debugger


    if (this.data) {

      this.productForm.setValue({
        nombre: this.data.nombre || '',
        precio: this.data.precio || 0,
        categoria: this.data.categoria || '',
        imagen: this.data.imagen || '',
        descripcion: this.data.descripcion || '',
        stock: this.data.stock || ''

      });

      console.log(this.productForm.value);

    }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    const newProduct: Product = { ...this.productForm.value };

    if (this.data) {
      newProduct.id = this.data.id;

      this._productService.updateProduct(newProduct).subscribe({
        next: (value) => {
          this.dialogRef.close(value);
          this._toastrService.success('Producto actualizado con éxito');
          this._productService.getAllProducts();
        },
        error: (err) => {
          console.log('Error al actualizar el producto', err);
        }
      });
    } else {
      this._productService.createProduct(newProduct).subscribe({
        next: (value) => {
          this.dialogRef.close(value);
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
