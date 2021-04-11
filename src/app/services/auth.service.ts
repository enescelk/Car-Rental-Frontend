import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ItemResponseModel } from '../models/itemResponseModel';
import { LoginModel } from '../models/loginModel';
import { LocalStorageService } from './local-storage.service';
import { RegisterModel } from '../models/registerModel';
import { JwtHelperService } from "@auth0/angular-jwt";
import { TokenModel } from '../models/tokenModel';
import { ToastrService } from 'ngx-toastr';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId:number;
  jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(
    private httpClient:HttpClient,
    private localStorageService:LocalStorageService,
    private toastrService:ToastrService,) {this.setId()}

  login(loginModel:LoginModel){
    let newPath = environment.apiUrl + "auth/login"
    return this.httpClient.post<ItemResponseModel<TokenModel>>(newPath,loginModel);
  }

  register(registerModel:RegisterModel){
    let newPath = environment.apiUrl + "auth/register";
    return this.httpClient.post<ItemResponseModel<TokenModel>>(newPath,registerModel);
  }

  update(customer: Customer): Observable<ItemResponseModel<TokenModel>> {
    let newPath = environment.apiUrl + 'auth/update';
    return this.httpClient.put<ItemResponseModel<TokenModel>>(newPath, customer);
 }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }

  logOut(){
    this.localStorageService.removeToken();
    this.toastrService.show("Cikis Yapildi","BASARILI !")
  }

  setId(){
    if(localStorage.getItem("token")){
      var decoded = this.jwtHelper.decodeToken(localStorage.getItem("token")!);
      var propUserId = Object.keys(decoded).filter(x => x.endsWith("/nameidentifier"))[0];
      this.userId = Number(decoded[propUserId]);
    }

  }

  getUserId():number{
    console.log(this.userId);
    return this.userId;
  }

  getDecodedToken(){
    try{
      return this.jwtHelper.decodeToken(this.localStorageService.getToken()!);
    }
    catch(Error){
        return null;
    }
  }
}
