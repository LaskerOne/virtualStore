import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Iproduct } from "src/app/pages/products/interfaces/product.interface";

@Injectable({
    providedIn: 'root'
})

export class ShoppingCartService {
//Programación reactiva
    products: Iproduct[] = [];

        //observables
    private cartSubject = new Subject<Iproduct[]>();
    private totalSubject = new Subject<number>();
    private quantitySubject = new Subject<number>();

    get totalAction$(): Observable<number> {
        return this.totalSubject.asObservable();
    }

    get quantityAction$(): Observable<number> {
        return this.quantitySubject.asObservable();
    }

    get cartAction$(): Observable<Iproduct[]> {
        return this.cartSubject.asObservable();
    }

        //método para calcular el total de la orden
    private calcTotal(): void {
        const total = this.products.reduce( (actual, prod) => actual += prod.price, 0);
        this.totalSubject.next(total);  
    }

    private contadorProductos(): void {

        const cantidadProductos = this.products.length;
        this.quantitySubject.next(cantidadProductos);
    }

    //método para añadir productos al carrito
    private addToCart(product:Iproduct): void {

        this.products.push(product);
        this.cartSubject.next(this.products);
    }

    updateCart(producto:Iproduct): void {
        this.addToCart(producto);
        this.contadorProductos();
        this.calcTotal();
    }
}