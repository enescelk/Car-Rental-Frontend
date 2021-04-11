import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  customer: Customer;

  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private localStorageService:LocalStorageService,
    private customerService:CustomerService,
    private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  setCustomerByEmail(email:string){
    this.customerService.getCustomer().subscribe(response=>{
      let currentCustomer = response.data.filter(c => c.email == email)[0];
      this.localStorageService.setCurrentCustomer(currentCustomer);
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel = Object.assign({},this.loginForm.value);
      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.success(response.message,"BASARILI !")
        this.setCustomerByEmail(loginModel.email);
        this.localStorageService.setToken(response.data.token)

        this.router.navigate(['/cars'])
      },responseError=>{
        this.toastrService.error(responseError.error);
      })
    }
  }


}
