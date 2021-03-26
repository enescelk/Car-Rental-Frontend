import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../models/brand';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private httpClient:HttpClient,) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath = environment.apiUrl + "Brands/GetAll"
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  getById(id:number):Observable<ListResponseModel<Brand>>{
    let newPath = environment.apiUrl + "Brands/GetById?id"+id
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  add(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl+"Brands/Add",brand)
  }

  update(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.put<ResponseModel>(environment.apiUrl+"Brands/update",brand)
  }


}
