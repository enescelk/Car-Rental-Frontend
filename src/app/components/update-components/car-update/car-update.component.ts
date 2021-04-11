import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { BrandService } from 'src/app/services/brand.service';
import { Car } from 'src/app/models/car';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { ActivatedRoute } from '@angular/router';
import { CarDetailService } from 'src/app/services/car-detail.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm: FormGroup;
  carDetail: CarDetail;
  cars: Car[];
  brands: Brand[];
  colors: Color[];

  selectedBrand: string;
  selectedColor: string;
  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private carDetailService: CarDetailService,
    private colorService: ColorService,
    private brandService: BrandService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getCarDetail(params['id']);
      }
    });
    this.getCars();
    this.getBrands();
    this.getColors();
  }

  getCarDetail(carId: number) {
    this.carDetailService.getCarDetail(carId).subscribe((response) => {
      this.carDetail = response.data;
      console.log(response.data);
      this.createCarUpdateForm();
    });
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: [{ value: this.carDetail.car.id, disabled: true }],
      name: [this.carDetail.car.name, Validators.required],
      brandId: [this.carDetail.car.brandId, Validators.required],
      colorId: [this.carDetail.car.colorId, Validators.required],
      minFindeks:[this.carDetail.car.minFindeks,Validators.required],
      dailyPrice: [this.carDetail.car.dailyPrice, Validators.required],
      modelYear: [this.carDetail.car.modelYear, Validators.required],
      description: [this.carDetail.car.description, Validators.required],
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      console.log(response.data);
      this.cars = response.data;
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  update() {
    if (this.carUpdateForm.valid) {
      let carModel: Car = Object.assign({}, this.carUpdateForm.getRawValue());
      carModel.id = Number(carModel.id);
      carModel.dailyPrice = Number(carModel.dailyPrice);
      this.carService.update(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'BASARILI !');
        },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (let i = 0;i < responseError.error.ValidationErrors.length; i++) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formu doldurmanız gerekli', 'HATA !');
    }
  }
}
