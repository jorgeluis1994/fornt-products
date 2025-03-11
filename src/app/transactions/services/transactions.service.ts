import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/Transactions';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private readonly _http=inject(HttpClient);

    constructor() { }

    getAllTransactions(): Observable<Transaction[]> {

      return this._http.get<Transaction[]>('http://localhost:5217/api/Transaccion');
    }

    deleteTransaction(id: number): Observable<void> {
      return this._http.delete<void>(`${'http://localhost:5217/api/Transacciones'}/${id}`);
    }

    createTransaction(transaction: Transaction): Observable<void> {
      return this._http.post<void>('http://localhost:5217/api/Transacciones/save', transaction);
    }
}


