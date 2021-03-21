import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  customers:Customer[];
  customerId:Number;
  rentDate:Date;
  returnDate:Date;
  dataLoaded = false;
  @Input() car:Car;
  constructor(
    private router:Router,
    private customerService:CustomerService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getCustomer();
    console.log(this.car);
  }

  getCustomer(){
    this.customerService.getCustomer().subscribe(response => {
      this.customers = response.data;
      //this.dataLoaded = true;
    })
  }

  getRentMinDate(){
    var today  = new Date();
    //min="1980-01-01"
    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0,10)
  }

  getReturnMinDate(){
    var today  = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().slice(0,10)
  }

  createRental(){
    let MyRental:Rental = {
      rentDate: this.rentDate,
      returnDate: this.returnDate,
      carId : this.car.id,
      customerId: parseInt(this.customerId.toString())
    }
    this.router.navigate(['/payment/', JSON.stringify(MyRental)]);
    this.toastrService.info("Ödeme sayfasına yönlendiriliyorsunuz...", "Ödeme İşlemleri");
    /*
    this.rentalService.rentalCar(MyRental).subscribe(response => {
      this.toastr.success(response.message.toString(), "Harika...");
    })
    */
  }


}
