import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/Coupon';
import { UserService } from 'src/app/services/UserService';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';
import { CouponsService } from 'src/app/services/CouponsService';


@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

    public coupons: Coupon[];
    public isShowAllCoupons: boolean;

    //   constructor(private userService:UserService) { }
    constructor(private couponsService: CouponsService) { }

    ngOnInit() {
        this.isShowAllCoupons = true;
        let observable = this.couponsService.getAllCoupons();
        observable.subscribe(couponsList => {
            this.coupons = couponsList;
            // console.error(this.coupons);
        }, error => {
            alert('Failed to get coupons ' + JSON.stringify(error));
        });

        // this.userService.createUser(new UserLoginDetails("avi", "1234")).subscribe(successfulServerRequestData => {
        //     console.log(successfulServerRequestData);                                        
        // }, serverErrorResponse => {                     
        //     alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message);            
        // }); 


    }

    public showCoupon(coupon: Coupon) {
        // Debugging using printing the object value in the browser's console
        console.log(coupon);
        this.isShowAllCoupons = false;
    }

    public showCoupons(){
        this.isShowAllCoupons = true;
    }

    public purchaseCoupon(){
    }
}
