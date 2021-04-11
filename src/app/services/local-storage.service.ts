import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  currentCustomer: string = "currentCustomer";
  constructor() { }

  set(key: string, value: string) {
    localStorage.setItem(key, value)
  }

  remove(key: string) {
    localStorage.removeItem(key)
  }

  get(key: string) {
    return localStorage.getItem(key)
  }

  setToken(token: string) {
    localStorage.setItem("token", token)
  }

  removeToken() {
    localStorage.removeItem("token")
  }

  getToken() {
    return localStorage.getItem("token")
  }

  setCurrentCustomer(currentCustomerValue: Customer) {
    localStorage.setItem(this.currentCustomer, JSON.stringify(currentCustomerValue));
  }

  getCurrentCustomer(): Customer {
    return JSON.parse(localStorage.getItem(this.currentCustomer));
  }

  removeCurrentCustomer() {
    localStorage.removeItem(this.currentCustomer);
  }
}
