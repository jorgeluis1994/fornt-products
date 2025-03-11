export interface Transaction {
  Id: number;
  Nombre: string;
  Descripcion: string;
  Categoria: string;
  Imagen: string;
  Precio: number;
  Stock: number;
  Fecha: string;
  Tipo: 'compra' | 'venta';
  Cantidad: number;
  PrecioTotal: number;
  Detalle: string;
}

