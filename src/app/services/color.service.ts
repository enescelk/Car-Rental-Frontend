import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Color } from '../models/color';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    let newPath = environment.apiUrl + "Colors/GetAll"
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

  getById(id:number):Observable<ItemResponseModel<Color>>{
    let newPath = environment.apiUrl + "Colors/GetById?id="+id
    return this.httpClient.get<ItemResponseModel<Color>>(newPath);
  }

  add(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl+"Colors/Add",color);
  }

  update(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl+"Colors/Update",color);
  }


}
