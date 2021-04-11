import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreditCard } from '../models/creditCard';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  constructor(private httpClient :HttpClient) { }

  add(card:CreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl + "creditcards/add",card);
  }

  delete(card:CreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl + "creditcards/delete",card);
  }

  update(card:CreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl + "creditcards/update",card);
  }

  getCardsByUserId(userId: number): Observable<ListResponseModel<CreditCard>> {
    return this.httpClient.get<ListResponseModel<CreditCard>>(environment.apiUrl + "creditcards/getcardsbyuserid?userId=" + userId);
  }
}
