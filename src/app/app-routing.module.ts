import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/add-components/brand-add/brand-add.component';
import { CarAddComponent } from './components/add-components/car-add/car-add.component';
import { ColorAddComponent } from './components/add-components/color-add/color-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';
import { BrandUpdateComponent } from './components/update-components/brand-update/brand-update.component';
import { CarUpdateComponent } from './components/update-components/car-update/car-update.component';
import { ColorUpdateComponent } from './components/update-components/color-update/color-update.component';

const routes: Routes = [
  {path:"", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brands/:id", component:CarComponent},
  {path:"cars/colors/:id", component:CarComponent},
  {path:"cars/car-detail/:id", component:CarDetailComponent},
  {path:"cars/filter/:brandId/:colorId",component:CarComponent},
  {path:"rentals/:id",component:RentalComponent},
  {path:"payment/:myrental",component:PaymentComponent},
  {path:"cars/brand/:brandId/color/:colorId",component:CarComponent},
  {path:"cars/add", component:CarAddComponent},
  {path:"brands/add",component:BrandAddComponent},
  {path:"colors/add",component:ColorAddComponent},
  {path:"cars/update/:id",component:CarUpdateComponent},
  {path:"brands/update/:id",component:BrandUpdateComponent},
  {path:"colors/update/:id",component:ColorUpdateComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
