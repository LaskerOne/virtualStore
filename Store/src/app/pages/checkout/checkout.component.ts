import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { DataService } from 'src/app/shared/services/data.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Idetails } from 'src/app/shared/interfaces/Iorder.interface';
import { Istore } from 'src/app/shared/interfaces/Istore.interface';
import { Iproduct } from '../products/interfaces/product.interface';
import { Router } from '@angular/router';
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
              private router: Router) { }

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
      pickup: this.isDelivery
    }
    this.dataSvc.saveOrder(data)
    .pipe(
      tap(res => console.log('Order ->', res)),
      switchMap (({id:orderId}) => {
        const details = this.prepareDeatails();
        return this.dataSvc.saveDetailsOfOrder({details, orderId});
      }),
      tap(() => this.router.navigate(['/thank-you-page']))
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
      const {id:productId, name:productName, cant:quantity, stock}= product;
      details.push({productId, productName, quantity});
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
}
