import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarDetailAndImagesDto } from '../models/carDetailAndImagesDto';
import { ItemResponseModel } from '../models/itemResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  constructor(private httpClient:HttpClient) { }

  getCarDetail(carId:number):Observable<ItemResponseModel<CarDetailAndImagesDto>>{
    let newPath = environment.apiUrl + 'cars/getcardetail?carId='+carId;
    return this.httpClient.get<ItemResponseModel<CarDetailAndImagesDto>>(newPath);
  }
}
