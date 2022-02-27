import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Iproduct } from '../interfaces/product.interface';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
//Con el decorador input se establece la comunicación de un componente padre a un componente hijo
@Input() product!: Iproduct;
//Con el decorador output se establece la comunicación inversa
@Output() addToCartClick = new EventEmitter<Iproduct>();

constructor() { }

    //Metodo personalizado para agregar al shopping card
    onClick(): void {
        this.addToCartClick.emit(this.product);
    }
}
