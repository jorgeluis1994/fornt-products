import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionsService } from '../../services/transactions.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Transaction } from '../../models/Transactions';
import { Product } from '../../../products/models/Producto';
import { ProductsService } from '../../../products/services/products.service';

@Component({
  selector: 'app-create-transactions',
  standalone: false,
  templateUrl: './create-transactions.component.html',
  styleUrls: ['./create-transactions.component.css']
})
export class CreateTransactionsComponent {

  transactionForm: FormGroup;
  productos: any[] = [];

  private readonly _transactionsService = inject(TransactionsService);
  private readonly _toastrService = inject(ToastrService);
  private readonly _productService = inject(ProductsService);

  constructor(
    private dialogRef: MatDialogRef<CreateTransactionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    // Recupera todos los productos al iniciar el componente
    this.getAllProducts();

    // Inicializar el formulario
    this.transactionForm = new FormGroup({
      fecha: new FormControl(new Date(), Validators.required),
      tipo: new FormControl('compra', Validators.required),
      productoId: new FormControl(null, Validators.required),
      cantidad: new FormControl(1, [Validators.required, Validators.min(1)]),
      precioUnitario: new FormControl({ value: 0, disabled: true }, Validators.required),
      precioTotal: new FormControl({ value: 0, disabled: true }, Validators.required),
      detalle: new FormControl('', Validators.required)
    });

    // Actualiza el precio unitario cuando cambie el producto
    this.transactionForm.get('productoId')?.valueChanges.subscribe(productId => {
      this.updatePrecioUnitario(productId);
    });
  }

  // Recupera los productos del servicio
  getAllProducts() {
    this._productService.getAllProducts().subscribe({
      next: (products) => {
        this.productos = products;
        console.log(this.productos);

        this._toastrService.success('Productos recuperados con éxito');
      },
      error: (err) => {
        console.error('Error al obtener productos', err);
      }
    });
  }

  // Actualiza el precio unitario cuando se selecciona un producto
  updatePrecioUnitario(productId: number) {
    const producto = this.productos.find(p => p.Id === productId);
    if (producto) {
      this.transactionForm.get('precioUnitario')?.setValue(producto.Precio);
      this.updatePrecioTotal();
    }
  }

  // Calcula el precio total cuando la cantidad cambie
  updatePrecioTotal() {
    const cantidad = this.transactionForm.get('cantidad')?.value;
    const precioUnitario = this.transactionForm.get('precioUnitario')?.value;
    const precioTotal = cantidad * precioUnitario;
    this.transactionForm.get('precioTotal')?.setValue(precioTotal);
  }

  // Cierra el diálogo
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Envia la transacción
  onSubmit(): void {
    console.log(this.transactionForm.value);

    if (this.transactionForm.valid) {
      const newTransaction: Transaction = this.transactionForm.value;
      console.log('Transacción creada:', newTransaction);
      // Aquí podrías llamar al servicio para guardar la transacción
      this._transactionsService.createTransaction(newTransaction).subscribe({
        next: () => {
          this._toastrService.success('Transacción creada con éxito');
          this.dialogRef.close();
        },
        error: (err) => {
          console.error('Error al crear la transacción', err);
          this._toastrService.error('Error al crear la transacción');
        }
      });
    }
  }
}
