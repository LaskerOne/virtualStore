import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { delay, switchMap, tap } from 'rxjs/operators';
import { DataService } from 'src/app/shared/services/data.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Idetails } from 'src/app/shared/interfaces/Iorder.interface';
import { Istore } from 'src/app/shared/interfaces/Istore.interface';
import { Iproduct } from '../products/interfaces/product.interface';
import { Router } from '@angular/router';
import { ProductscService } from '../products/services/products.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  //Propiedad que se emplea como objeto para maquetar
  model = {

    name: '',
    store: '',
    shippingAdress: '',
    city: '', 
  }
  stores: Istore[] =[];

  isDelivery = true;

  cart: Iproduct[] = [];

  constructor(private dataSvc: DataService, 
              private shoppingCartSvc: ShoppingCartService,
              private router: Router,
              private productSvc: ProductscService) { 

                this.checkIsEmpty();
              }

  ngOnInit(): void {
    this.getTiendas();
    this.getDataCart();
    this.prepareDeatails();
  }

  onPickupOrDelivery(value: boolean): void {

    this.isDelivery = value;
  }

  onSubmit({value: formData}: NgForm): void {
    
    const data = {
      ...formData,
      date: this.getCurrentDate(),
      isDelivery: this.isDelivery
    }
    this.dataSvc.saveOrder(data)
    .pipe(
      tap(res => console.log('Order ->', res)),
      switchMap (({id:orderId}) => {
        const details = this.prepareDeatails();
        return this.dataSvc.saveDetailsOfOrder({details, orderId});
      }),
      tap(() => this.router.navigate(['/checkout/thank-you-page'])),
      delay(2000),
      tap( () => this.shoppingCartSvc.resetCart())
    )
    .subscribe();
  }

  private getTiendas(): void {
    //metodo para devolver las tiendas almacenadas en el Json
    this.dataSvc.getTiendas()
    .pipe(
      tap((stores: Istore[]) => this.stores = stores))
    .subscribe()
  }

  private getCurrentDate(): string {
    //metodo para devolver el time y con base al horario local devuelve fechas como string
    return new Date().toLocaleDateString()
  }

    // metodo para organizar la data que se almacenará en los detalles de la orden
  private prepareDeatails(): Idetails[] {

    const details: Idetails[] = [];
    this.cart.forEach((product: Iproduct) => {
      const {id:productId, name:productName, cant:quantity, stock} = product;
      const updateStock = (stock - quantity);

      this.productSvc.updateStock(productId, updateStock)
      .pipe(
        tap( () => details.push({productId, productName, quantity}))
      )
      .subscribe()
      
    })
    return details;
  }

  private getDataCart(): void {
    //Metodo para suscribirse al observable y recuperar la data para poner los productos en cart
    this.shoppingCartSvc.cartAction$
    .pipe(
      tap((products: Iproduct[]) => this.cart = products)
    )
    .subscribe()
  }

  private checkIsEmpty(): void {

    this.shoppingCartSvc.cartAction$
    .pipe(
      tap((products: Iproduct[]) => {
        if(Array.isArray(products) && !products.length) {
          this.router.navigate(['/products'])
        } 
      })
    )
    .subscribe()
  }
}
