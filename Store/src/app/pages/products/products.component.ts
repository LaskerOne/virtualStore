import { Component, OnInit } from '@angular/core';
import { ProductscService } from './services/products.service';
import { tap } from 'rxjs/operators';
import { Iproduct } from './interfaces/product.interface';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  template: `

      <!--el caracter pipe tiene la función de transformar Data-->
    <section class="products">
      <app-product 
        (addToCartClick)="addToCart($event)"
        [product]="product" 
        *ngFor="let product of products">
      </app-product>
  </section>  
  `,
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  
  products!: Iproduct[];
  constructor(private productSvc: ProductscService, private shoppingCartSvc: ShoppingCartService ) { }

  ngOnInit(): void {

    //De esta forma se llama el Observable
    this.productSvc.getProducts()
    .pipe(
        tap((products: Iproduct[]) => this.products = products)
    ).subscribe();
  }

  addToCart(product: Iproduct): void {

    this.shoppingCartSvc.updateCart(product);
  }
}
