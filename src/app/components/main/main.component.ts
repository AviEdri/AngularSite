import { Component, OnInit } from '@angular/core';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';
import { UserService } from 'src/app/services/UserService';
import { Router } from '@angular/router';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    public userLoginDetails: UserLoginDetails;
    private usersService: UserService;

    // The router parameter is an example to a short writing of a member + it's assignment
    // private router: Router EQUIVALENT TO the following 3: 
    // 1. Member definition
    // 2. Parameter definition
    // 3. this.router = router
    constructor(usersService : UserService, private router: Router) {
        this.userLoginDetails = new UserLoginDetails();
        this.usersService = usersService;
    }

    public login(): void{
        // Creating an observable object
        // It looks like an http request had been issued BUT IT DIDN'T
        const observable = this.usersService.login(this.userLoginDetails);

        // The method subscribe() ussues an http request to the server
        // successfulServerRequestData
        observable.subscribe(successfulServerRequestData => {
            console.log(successfulServerRequestData);                    
            
            this.usersService.setLoginToken(successfulServerRequestData.token);

            if(successfulServerRequestData.userType == "CUSTOMER"){
                this.router.navigate(["/customer"]);
            }

            if(successfulServerRequestData.userType == "ADMIN"){
                this.router.navigate(["/admin"]);
            }

            if(successfulServerRequestData.userType == "COMPANY"){
                this.router.navigate(["/company"]);
            }
        }, serverErrorResponse => { // Reaching here means that the server had failed
                    // serverErrorResponse is the object returned from the ExceptionsHandler
            alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message);            
        }); 

    }

    ngOnInit() {
    }

}
