import { Component, OnInit } from '@angular/core';
import { ProductscService } from './services/products.service';
import { tap } from 'rxjs/operators';
import { Product } from './interfaces/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  
  products!: Product[];
  constructor(private productSvc: ProductscService) { }

  ngOnInit(): void {

    //De esta forma se llama el Observable
    this.productSvc.getProducts()
    .pipe(
        tap((products: Product[]) => this.products = products)
    ).subscribe();
  }

}
