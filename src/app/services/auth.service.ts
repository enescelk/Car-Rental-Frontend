import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ItemResponseModel } from '../models/itemResponseModel';
import { LoginModel } from '../models/loginModel';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RegisterModel } from '../models/registerModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userName:string;
  jwtHelper:JwtHelperService = new JwtHelperService();
  constructor(private httpClient:HttpClient,private localStorageService:LocalStorageService) { }

  login(loginModel:LoginModel){
    let newPath = environment.apiUrl + "auth/login"
    return this.httpClient.post<ItemResponseModel<TokenModel>>(newPath,loginModel);
  }

  register(registerModel:RegisterModel){
    let newPath = environment.apiUrl + "auth/register";
    return this.httpClient.post<ItemResponseModel<TokenModel>>(newPath,registerModel);
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }
}
