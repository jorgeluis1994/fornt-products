import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/Producto';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { CreateProductsComponent } from '../create-products/create-products.component';

@Component({
  selector: 'app-list-products',
  standalone: false,
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit {

  public dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public products: Product[] = [];

  private readonly _productService = inject(ProductsService);

  displayedColumns: string[] = ['id', 'name', 'price', 'category', 'actions'];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this._productService.getAllProducts().subscribe(
      {
        next:(products)=> {
          this.products = products;
          this.dataSource = new MatTableDataSource(this.products);
          this.dataSource.paginator = this.paginator;

        },
        error(err) {
          console.error('Error al obtener productos', err);

        },
      }
    )
  }

  editProduct(product: Product) {
    console.log('Editar:', product);
  }

  // deleteProduct(id: number) {
  //   this._productService.deleteProduct(id).subscribe(() => {
  //     this.products = this.products.filter(p => p.id !== id);
  //   });
  // }

  addProduct() {
    console.log('Agregar nuevo producto');
    // Aquí puedes abrir un formulario modal para agregar
  }

  //abrir creador de producto

  openProduct(){
    const dialogRef = this.dialog.open(CreateProductsComponent);

  }

}
