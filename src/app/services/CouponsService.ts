import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coupon } from '../models/Coupon';


@Injectable({
    // One object for the entire website
    providedIn: 'root'
})
export class CouponsService {
 
    constructor(private http: HttpClient) {}

    public getAllCoupons(): Observable<Coupon[]> {
        return this.http.get<Coupon[]>("http://localhost:8080/coupons");
    }
}
