import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(private httpClient:HttpClient) { }

  getCars(): Observable<ListResponseModel<Car>>{
    let newPath = environment.apiUrl + "Cars/GetCarDetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrandId(id:number):Observable<ListResponseModel<Car>>{
    let newPath =environment.apiUrl + "Cars/GetCarsByBrandId?id="+id
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColorId(id:number):Observable<ListResponseModel<Car>>{
    let newPath =environment.apiUrl + "Cars/GetCarsByColorId?id="+id
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarById(id:number):Observable<ItemResponseModel<Car>>{
    let newPath = environment.apiUrl + "Cars/GetById?id="+id;
    return this.httpClient.get<ItemResponseModel<Car>>(newPath);
  }

  getCarsByFilter(brandId:number,colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = environment.apiUrl + `Cars/GetCarsByFilter?brandId=${brandId}&colorId=${colorId}`;
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

  add(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl+"Cars/Add",car)
  }

  update(car:Car):Observable<ResponseModel>{
    return this.httpClient.put<ResponseModel>(environment.apiUrl+"Cars/Update",car)
  }
}
