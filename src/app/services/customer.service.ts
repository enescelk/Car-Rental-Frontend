import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = environment.apiUrl + 'customers/getcustomerdetails'
  constructor(private httpClient:HttpClient) { }
  getCustomer():Observable<ListResponseModel<Customer>>{
    return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl);
  }

  getById(id:number):Observable<ListResponseModel<Customer>>{
    let newPath = environment.apiUrl + "customers/getbyId?id"+id
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }
}
