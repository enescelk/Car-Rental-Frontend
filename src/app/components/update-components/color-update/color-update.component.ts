import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  colorUpdateForm:FormGroup;
  color:Color;
  colors:Color[];
  constructor(
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private colorService:ColorService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getByColorId(params['id']);
    }
    this.getColor();
    this.createColorUpdateForm();
    });

  }

  getColor(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
    })
  }

  getByColorId(id:number){
    this.colorService.getById(id).subscribe(response=>{
      this.color = response.data;
    })
  }

  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      // id: [{value:this.color.id,disabled:true},Validators.required],
      name:["",Validators.required],
    })
  }

  update(){
    if(this.colorUpdateForm.valid){
      let colorModel:Color = Object.assign({},this.colorUpdateForm.getRawValue());
      colorModel.id = this.color.id;
      console.log(colorModel);
      this.colorService.update(colorModel).subscribe(response=>{
        this.toastrService.success(response.message,"BASARILI !")
      },responseError=>{
        console.log(responseError);
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
    else{
      console.log("selam");
    }
  }


}
