import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  customer: Customer;
  customerUpdateForm: FormGroup;

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCustomer();
    this.createCustomerUpdateForm();
  }

  getCustomer() {
    this.customer = this.localStorageService.getCurrentCustomer();
  }

  createCustomerUpdateForm() {
    this.customerUpdateForm = this.formBuilder.group({
      id: [this.customer.id, Validators.required],
      userId: [this.customer.userId, Validators.required],
      firstName: [this.customer.firstName, Validators.required],
      lastName: [this.customer.lastName, Validators.required],
      companyName: [this.customer.companyName, Validators.required],
      email: [this.customer.email, Validators.required],
      password: [''],
      confirmPassword: [''],
    })
  }

  update() {
    if (this.customerUpdateForm.invalid) {
      return this.toastrService.warning("Eksik bilgi", "Dikkat");
    }

    let customerUpdateModel = this.customerUpdateForm.value;

    if (customerUpdateModel.password != customerUpdateModel.confirmPassword) {
      return this.toastrService.error("Şifrelerine dikkat et dostum", "Hata")
    }

    this.authService.update(customerUpdateModel).subscribe(responseSuccess => {
      this.localStorageService.removeCurrentCustomer();
      this.localStorageService.setCurrentCustomer(customerUpdateModel);
      this.toastrService.success(responseSuccess.message, "Başarılı")

      return this.router.navigate(['/profile']);
    }, responseError => {
      console.log(responseError)
      this.toastrService.error(responseError.error,"HATA !");
    })

    return true;
  }
}
