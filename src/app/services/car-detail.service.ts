import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { carDetailAndImagesDto } from '../models/CarDetailAndImagesDto';
import { ItemResponseModel } from '../models/itemResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  constructor(private httpClient:HttpClient) { }

  getCarDetail(carId:number):Observable<ItemResponseModel<carDetailAndImagesDto>>{
    let newPath = environment.apiUrl + 'cars/getcardetail?carId='+carId;
    return this.httpClient.get<ItemResponseModel<carDetailAndImagesDto>>(newPath);
  }
}
