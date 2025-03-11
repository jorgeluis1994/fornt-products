import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { ListTransactionsComponent } from './components/list-transactions/list-transactions.component';
import { CreateTransactionsComponent } from './components/create-transactions/create-transactions.component';
// Importaciones de Angular Material

import { MatPaginatorModule } from '@angular/material/paginator';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { TransactionsService } from './services/transactions.service';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MatIconModule } from '@angular/material/icon';
import { ProductsService } from '../products/services/products.service';


@NgModule({
  declarations: [
    TransactionsComponent,
    ListTransactionsComponent,
    CreateTransactionsComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule

  ],

    providers:[TransactionsService,ProductsService]
})
export class TransactionsModule { }
