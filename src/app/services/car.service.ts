import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(private httpClient:HttpClient) { }

  getCars(): Observable<ListResponseModel<Car>>{
    let newPath = environment.apiUrl + "Cars/GetCarDetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(id:number):Observable<ListResponseModel<Car>>{
    let newPath =environment.apiUrl + "Cars/GetCarsByBrandId?id="+id
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(id:number):Observable<ListResponseModel<Car>>{
    let newPath =environment.apiUrl + "Cars/GetCarsByColorId?id="+id
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetails(carId:number):Observable<ListResponseModel<Car>>{
    let newPath = environment.apiUrl + "Cars/GetCarDetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarDetail(id:number):Observable<ItemResponseModel<Car>>{
    let newPath = environment.apiUrl + 'Cars/GetCarDetail?id='+id
    return this.httpClient.get<ItemResponseModel<Car>>(newPath)
  }
}
