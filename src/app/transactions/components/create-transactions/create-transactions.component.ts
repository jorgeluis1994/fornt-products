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
  styleUrls: ['./create-transactions.component.css']
})
export class CreateTransactionsComponent {
  transactionForm!: FormGroup;
  isEditMode = false;

  private readonly _transactionsService = inject(TransactionsService);
  private readonly _toastrService = inject(ToastrService);

  constructor(
    private dialogRef: MatDialogRef<CreateTransactionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    this.transactionForm = new FormGroup({
      productoId: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      precio: new FormControl(0, [Validators.required, Validators.min(0)]),
      categoria: new FormControl('', [Validators.required]),
      imagen: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
      cantidad: new FormControl(0, [Validators.required, Validators.min(1)]),
      fecha: new FormControl('', [Validators.required]),
      precioUnitario: new FormControl(0, [Validators.required, Validators.min(0)]),  // Agregar precioUnitario
      precioTotal: new FormControl(0, [Validators.required, Validators.min(0)]),  // Agregar precioTotal
      detalle: new FormControl('', [Validators.required])  // Agregar detalle
    });



    if (this.data) {
      this.isEditMode = true;

      // Convertir la fecha a formato adecuado para input datetime-local
      const formattedFecha = this.formatDateForInput(this.data.fecha);

      this.transactionForm.patchValue({
        productoId: this.data.productoId || '',
        nombre: this.data.nombre || '',
        precio: this.data.precio || 0,
        categoria: this.data.categoria || '',
        imagen: this.data.imagen || '',
        descripcion: this.data.descripcion || '',
        tipo: this.data.tipo || '',
        cantidad: this.data.cantidad || 0,
        fecha: formattedFecha || ''
      });
    }
  }

  // Método para formatear la fecha
  formatDateForInput(date: string): string {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
    const day = formattedDate.getDate().toString().padStart(2, '0');
    const hours = formattedDate.getHours().toString().padStart(2, '0');
    const minutes = formattedDate.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const newTransaction: Transaction = this.transactionForm.value;

      if (this.isEditMode) {
        this._transactionsService.updateTransaction(newTransaction).subscribe({
          next: (value) => {
            this.dialogRef.close(value);
            this._toastrService.success('Transacción actualizada con éxito');
          },
          error: (err) => {
            console.log('Error al actualizar la transacción', err);
            this._toastrService.error('Error al actualizar la transacción');
          }
        });
      } else {
        this._transactionsService.createTransaction(newTransaction).subscribe({
          next: (value) => {
            this.dialogRef.close(value);
            this._toastrService.success('Transacción creada con éxito');
          },
          error: (err) => {
            console.log('Error al crear la transacción', err);
            this._toastrService.error('Error al crear la transacción');
          }
        });
      }
    }
  }
}
