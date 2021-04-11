import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
import { AuthService } from 'src/app/services/auth.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-credit-cart',
  templateUrl: './credit-cart.component.html',
  styleUrls: ['./credit-cart.component.css']
})
export class CreditCartComponent implements OnInit {

  cards:CreditCard[] = [];

  constructor(
   private creditCartService:CreditCardService,
   private toastrService:ToastrService,
   private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.getCardsByUserId();
  }

  getCardsByUserId(){
    this.creditCartService.getCardsByUserId(this.localStorageService.getCurrentCustomer().id).subscribe(response=>{
      this.cards = response.data;
    })
  }

  delete(card:CreditCard){
    this.creditCartService.delete(card).subscribe(response=>{
      this.toastrService.success("Kart Silindi");
      window.location.reload();
    })
  }

}
