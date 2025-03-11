import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/Producto';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { CreateProductsComponent } from '../create-products/create-products.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-products',
  standalone: false,
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit {

  private readonly _toastrService = inject(ToastrService);

  public dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public products: Product[] = [];

  private readonly _productService = inject(ProductsService);

  displayedColumns: string[] = ['id', 'name', 'price','stock', 'category', 'actions'];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {

    this.getAllProducts();

  }

  editProduct(product: Product) {


    console.log('Id producto:', product.id);

    const dialogRef = this.dialog.open(CreateProductsComponent,{
      width: '400px',
      data: product

    });
    dialogRef.afterClosed().subscribe({
      next:(value)=> {
        if(value){
          this.getAllProducts();
        }
      },
    })
  }

  getAllProducts(){
    this._productService.getAllProducts().subscribe(
      {
        next:(products)=> {
          this.products = products;
          console.log(this.products);

          this.dataSource = new MatTableDataSource(this.products);
          this.dataSource.paginator = this.paginator;

        },
        error(err) {
          console.error('Error al obtener productos', err);

        },
      }
    )

  }

  deleteProduct(id: number) {
    this._productService.deleteProduct(id).subscribe(
      {
        next:(value)=> {

          console.log(value);
          this._toastrService.success('Producto eliminado con éxito');
          this.getAllProducts();


        },
      }
    )
  }

  openProduct(){
    const dialogRef = this.dialog.open(CreateProductsComponent,{
      width: '400px',
    });

    dialogRef.afterClosed().subscribe({
      next:(value)=> {
        if(value){
          this.getAllProducts();
        }
      },
    })

  }

}
