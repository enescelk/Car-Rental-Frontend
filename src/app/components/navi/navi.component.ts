import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  userLogged:boolean;
  userName:string;
  customers : Customer[] = [];
  customer: Customer;
  constructor(private authService:AuthService,private customerService:CustomerService) { }

  ngOnInit(): void {
    this.checkToLogin();
  }

  checkToLogin(){
    if(this.authService.isAuthenticated()){
      return true;
    }
    else{
      return false;
    }
  }

  getCustomerById(id:number){
    this.customerService.getById(id).subscribe(response=>{
      console.log(response)
      this.customer = response.data[0];
    });
  }

}
