import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Filters } from 'src/app/models/filterts';
import { BrandService } from 'src/app/services/brand.service';
@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brand:Brand[];
  currentBrand: Brand;
  allBrand?: Brand;
  dataLoaded = false;
  filterText ="";
  Filters = {brandId: '', colorId: ''};
  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    this.getBrands();

  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brand = response.data;
      this.dataLoaded = true;
    })
  }
  getCurrentBrandClass(brand:Brand){
    if(brand==this.currentBrand){
      return "list-group-item active"
    } else {
      return "list-group-item"
    }
  }

  getAllBrandClass(){
    if(!this.currentBrand){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

  setCurrentBrand() {
    this.currentBrand !== undefined
      ? (Filters.brandId = this.currentBrand.id.toString())
      : (Filters.brandId = '');
  }

  allBrandSelected() {
    return this.currentBrand == undefined ? true : false;
  }

}
