import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { carDetailAndImagesDto } from 'src/app/models/CarDetailAndImagesDto';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  cars: Car;
  carImages:CarImage[] = [];
  carDetail:carDetailAndImagesDto;
  dataLoaded = false;
  imageBasePath = environment.baseUrl;
  constructor(private carDetailService:CarDetailService,
    private activatedRoute:ActivatedRoute,
    private imageService:CarImageService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["id"]){
        this.getCarDetail(params["id"]);
      }


    });
  }

  getCarDetail(carId:number) {
    this.carDetailService.getCarDetail(carId).subscribe((response) => {
      this.carDetail = response.data;
      this.dataLoaded = true;
    });
  }

    getSliderClassName(index:Number){
      if(index == 0){
        return "carousel-item active";
      } else {
        return "carousel-item";
      }
    }
}
