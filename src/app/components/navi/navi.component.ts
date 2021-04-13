import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
import { faCar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  faCar = faCar;
  constructor(
    private authService:AuthService,
    private toastrService: ToastrService,
    private localStorageService:LocalStorageService,
    private router: Router) { }

  ngOnInit(): void {
  }

  checkToLogin(){
    return this.authService.isAuthenticated()
  }

  logOut(){
    this.authService.logOut();
    this.localStorageService.removeCurrentCustomer();
    this.toastrService.success('Çıkış yapıldı', 'Başarılı');

    return this.router.navigate(['/login']);
  }

  getCurrentCustomer(): Customer{
    return this.localStorageService.getCurrentCustomer();
  }
}
