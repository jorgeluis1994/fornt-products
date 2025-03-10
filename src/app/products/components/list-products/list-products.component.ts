import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/Producto';

@Component({
  selector: 'app-list-products',
  standalone: false,
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit {

  public products: Product[] = [];

  private readonly _productService = inject(ProductsService);

  displayedColumns: string[] = ['id', 'name', 'price', 'category', 'actions'];

  ngOnInit(): void {
    this._productService.getAllProducts().subscribe(
      {
        next:(products)=> {
          this.products = products;

        },
        error(err) {

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

}
