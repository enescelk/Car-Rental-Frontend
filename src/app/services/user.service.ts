import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  checkFindeks(id:number):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(environment.apiUrl + "auth/CheckFindeks",id);
  }
}
