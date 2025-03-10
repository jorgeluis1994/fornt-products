import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

import { MatTableModule } from '@angular/material/table';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { CreateProductsComponent } from './components/create-products/create-products.component';

import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

import { ProductsService } from './services/products.service';

// Importaciones de Angular Material

import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    ProductsComponent,
    ListProductsComponent,
    CreateProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatTableModule,HttpClientModule,MatButtonModule,MatPaginatorModule,MatDialogModule
  ],
  providers:[ProductsService]
})
export class ProductsModule { }
