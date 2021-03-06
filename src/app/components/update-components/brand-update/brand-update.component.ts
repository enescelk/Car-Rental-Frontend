import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brand:Brand;
  brands:Brand[] = [];
  brandUpdateForm:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private brandService:BrandService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getByBrandId(params['id']);

    }
    this.getBrand();
    this.createBrandUpdateForm();
    });

  };


  getBrand() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getByBrandId(id:number){
    this.brandService.getById(id).subscribe(response=>{
      this.brand = response.data;
      console.log(response.data);
    })
  }

  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      name:["",Validators.required],
    })
  }

  update(){
    if(this.brandUpdateForm.valid){
      let brandModel:Brand = Object.assign({},this.brandUpdateForm.getRawValue());
      brandModel.id = this.brand.id;
      this.brandService.update(brandModel).subscribe(response=>{
        this.toastrService.success(response.message,"BASARILI"
      )},responseError=>{
        if(responseError.error.ValidationErrors.length > 0){
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(
              responseError.error.ValidationErrors[i].ErrorMessage,
              'Doğrulama hatası'
            );

          }
        }
      })
    }
  }
}
