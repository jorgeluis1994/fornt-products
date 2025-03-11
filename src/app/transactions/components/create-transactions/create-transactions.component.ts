import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionsService } from '../../services/transactions.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Transaction } from '../../models/Transactions';

@Component({
  selector: 'app-create-transactions',
  standalone: false,
  templateUrl: './create-transactions.component.html',
  styleUrl: './create-transactions.component.css'
})
export class CreateTransactionsComponent {
  // Definir el formulario reactivo
transactionForm!: FormGroup;
// Modo de edición o creación
isEditMode = false;

private readonly _transactionsService = inject(TransactionsService);
private readonly _toastrService = inject(ToastrService);

constructor(
  private dialogRef: MatDialogRef<CreateTransactionsComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
) {

  this.transactionForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    precio: new FormControl('', [Validators.required, Validators.min(0)]),
    categoria: new FormControl('', [Validators.required]),
    imagen: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    cantidad: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  if (this.data) {
    this.transactionForm.setValue({
      nombre: this.data.nombre || '',
      precio: this.data.precio || 0,
      categoria: this.data.categoria || '',
      imagen: this.data.imagen || '',
      descripcion: this.data.descripcion || '',
      tipo: this.data.tipo || '',
      cantidad: this.data.cantidad || 0,
    });
  }
}

onNoClick(): void {
  this.dialogRef.close();
}

onSubmit(): void {
  if (this.transactionForm.valid) {
    debugger
    const newTransaction: Transaction = this.transactionForm.value;
    if (this.isEditMode) {
      // Aquí puedes manejar la edición si lo necesitas
      // this._transactionsService.updateTransaction(newTransaction).subscribe({
      //   next: (value) => {
      //     this.dialogRef.close(value);
      //     this._toastrService.success('Transacción actualizada con éxito');
      //     // Llamar para actualizar el listado de transacciones
      //   },
      //   error: (err) => {
      //     console.log('Error al actualizar la transacción', err);
      //   }
      // });
    } else {
      // Crear nueva transacción
      this._transactionsService.createTransaction(newTransaction).subscribe({
        next: (value) => {
          this.dialogRef.close(value);
          this._toastrService.success('Transacción creada con éxito');
          // Llamar para actualizar el listado de transacciones
        },
        error: (err) => {
          console.log('Error al crear la transacción', err);
        }
      });
    }
  }
}


}
