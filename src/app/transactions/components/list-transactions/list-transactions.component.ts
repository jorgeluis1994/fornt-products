import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Transaction } from '../../models/Transactions';
import { TransactionsService } from '../../services/transactions.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTransactionsComponent } from '../create-transactions/create-transactions.component';

@Component({
  selector: 'app-list-transactions',
  standalone: false,
  templateUrl: './list-transactions.component.html',
  styleUrl: './list-transactions.component.css'
})
export class ListTransactionsComponent {

  private readonly _toastrService = inject(ToastrService);

  public dataSource!: MatTableDataSource<Transaction>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public transactions: Transaction[] = [];

  private readonly _transactionsService = inject(TransactionsService);

  displayedColumns: string[] = ['id', 'nombre', 'precio', 'categoria', 'tipo', 'cantidad', 'actions'];


  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllTransactions();
  }

  editTransaction(transaction: Transaction) {
    console.log('Editar transacción:', transaction);
    // Aquí puedes abrir un diálogo para editar la transacción si lo necesitas
  }

  getAllTransactions() {
    this._transactionsService.getAllTransactions().subscribe({
      next: (transactions) => {
        console.log(transactions);

        this.transactions = transactions;
        this.dataSource = new MatTableDataSource(this.transactions);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Error al obtener transacciones', err);
      },
    });
  }

  deleteTransaction(id: number) {
    this._transactionsService.deleteTransaction(id).subscribe({
      next: (value) => {
        console.log(value);
        this._toastrService.success('Transacción eliminada con éxito');
        this.getAllTransactions();
      },
      error: (err) => {
        console.error('Error al eliminar transacción', err);
      }
    });
  }

  openTransaction() {
    const dialogRef = this.dialog.open(CreateTransactionsComponent);

    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.getAllTransactions();
        }
      },
    });
  }

}
