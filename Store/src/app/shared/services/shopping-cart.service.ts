import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { Iproduct } from "src/app/pages/products/interfaces/product.interface";

@Injectable({
    providedIn: 'root'
})

export class ShoppingCartService {
//Programación reactiva
    products: Iproduct[] = [];

        //observables
    private cartSubject = new BehaviorSubject<Iproduct[]>([]);
    private totalSubject = new BehaviorSubject<number>(0);
    private quantitySubject = new BehaviorSubject<number>(0);

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
        const total = this.products.reduce( (actual, prod) => actual += (prod.price * prod.cant), 0);
        this.totalSubject.next(total);  
    }

    private contadorProductos(): void {

        const cantidadProductos = this.products.reduce( (actual, prod) => actual += prod.cant, 0);
        this.quantitySubject.next(cantidadProductos);
    }

    //método para añadir productos al carrito
    private addToCart(product:Iproduct): void {
        const productsInCart = this.products.find(({id}) => id == product.id    )

        if(productsInCart) {
            productsInCart.cant +=1;
        }
        else {
            //undefined
            this.products.push( {...product, cant:1})
        }
        
        this.cartSubject.next(this.products);
    }

    updateCart(producto:Iproduct): void {
        this.addToCart(producto);
        this.contadorProductos();
        this.calcTotal();
    }

    resetCart(): void {
        this.cartSubject.next([]);
        this.totalSubject.next(0);
        this.quantitySubject.next(0);
        this.products = [];
    }
}