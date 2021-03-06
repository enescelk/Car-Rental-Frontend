import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreditCard } from '../models/creditCard';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient:HttpClient) { }
  pay(creditCard:CreditCard):Observable<ResponseModel>{
    console.log(creditCard);
    let path = environment.apiUrl+"rentals/paymentadd";
    return this.httpClient.post<ResponseModel>(path,creditCard);
  }
}
