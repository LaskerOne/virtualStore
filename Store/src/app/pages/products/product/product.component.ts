import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
//Con el decorador input se establece la comunicación de un componente padre a un componente hijo
@Input() product!: Product;
//Con el decorador output se establece la comunicación inversa
@Output() addToCartClick = new EventEmitter<Product>();

constructor() { }

    ngOnInit(): void {

    }

    //Metodo personalizado para agregar al shopping card
    onClick(): void {
        this.addToCartClick.emit(this.product);
    }
}
