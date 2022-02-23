import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

//Decorador: 
@Injectable({
  //Servicio disponible para toda la aplicación: el servicio es una capa que se añade para manejar data
  providedIn: 'root'
})
export class ProductscService {

  apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  //Método
  //Observable: representa un flujo de datos en el tiempo y/o una futura colección de data o valores
  getProducts() : Observable<Product[]>{

    return this.http.get<Product[]>(this.apiUrl);
  }
}
