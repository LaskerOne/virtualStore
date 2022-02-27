import { Component } from "@angular/core";
import { ShoppingCartService } from '../services/shopping-cart-service';

//decorador
@Component({
    selector: 'app-cart',
    template: `
    <ng-container *ngIf="{varTotal: total$ | async, varQuantity: quantity$ | async} as dataCart">
        <ng-container *ngIf="dataCart.varTotal">
            <mat-icon>add_shopping_cart</mat-icon>
            {{dataCart.varTotal | currency}}
            ({{dataCart.varQuantity}})
        </ng-container>
    </ng-container>`
})

//clase
export class CartComponent {

    quantity$ = this.shoppingCartSvc.quantityAction$;
    total$ = this.shoppingCartSvc.totalAction$;
    cart$ = this.shoppingCartSvc.cartAction$;

    constructor(private shoppingCartSvc: ShoppingCartService) {}
}