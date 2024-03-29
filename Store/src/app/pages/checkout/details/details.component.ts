import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

    total$ = this.shoppingCartSvc.totalAction$;
    cart$ = this.shoppingCartSvc.cartAction$;

  constructor(private shoppingCartSvc: ShoppingCartService) { }

  ngOnInit(): void {
  }

}
