import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44353/api/Rentals/GetRentalDetailsDto";
  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<Rental>>{
     return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl);
  }

  add(rental:Rental):Observable<ResponseModel>{
    let newPath = "https://localhost:44353/api/Rentals/add";
    return this.httpClient.post<ResponseModel>(newPath,rental)
  }
}
