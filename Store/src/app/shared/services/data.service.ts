import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IdetailsOrders, Iorder } from "../interfaces/Iorder.interface";
import { Istore } from "../interfaces/Istore.interface";

@Injectable({

providedIn: 'root'
})

export class DataService {
    private apiUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

    getTiendas(): Observable<Istore[]> {
        return this.http.get<Istore[]>(`${this.apiUrl}/stores`)
    }

    saveOrder(order: Iorder): Observable<Iorder> {
        return this.http.post<Iorder>(`${this.apiUrl}/orders`, order);
    }

    saveDetailsOfOrder(details: IdetailsOrders): Observable<IdetailsOrders> {
        return this.http.post<IdetailsOrders>(`${this.apiUrl}/detailsOrders`, details)
    } 
}