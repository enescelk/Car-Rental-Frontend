import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/add-components/brand-add/brand-add.component';
import { CarAddComponent } from './components/add-components/car-add/car-add.component';
import { ColorAddComponent } from './components/add-components/color-add/color-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';
import { BrandUpdateComponent } from './components/update-components/brand-update/brand-update.component';
import { CarUpdateComponent } from './components/update-components/car-update/car-update.component';
import { ColorUpdateComponent } from './components/update-components/color-update/color-update.component';
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/auth/register/register.component';
import { RegisterGuard } from './guards/register.guard';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { CreditCartComponent } from './components/credit-cart/credit-cart.component';

const routes: Routes = [
  {path:"", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/GetCarsByColorId/:colorId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/car-detail/:id", component:CarDetailComponent},
  {path:"rentals/:id",component:RentalComponent},
  {path:"payment/:myrental",component:PaymentComponent},
  {path:"cars/brand/:brandId/color/:colorId",component:CarComponent},
  {path:"cars/add", component:CarAddComponent,canActivate:[LoginGuard,RegisterGuard]},
  {path:"brands/add",component:BrandAddComponent,canActivate:[LoginGuard,RegisterGuard]},
  {path:"colors/add",component:ColorAddComponent,canActivate:[LoginGuard,RegisterGuard]},
  {path:"cars/update/:id",component:CarUpdateComponent,canActivate:[LoginGuard,RegisterGuard]},
  {path:"brands/update/:id",component:BrandUpdateComponent,canActivate:[LoginGuard,RegisterGuard]},
  {path:"colors/update/:id",component:ColorUpdateComponent,canActivate:[LoginGuard,RegisterGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"profile",component:ProfileComponent},
  {path:"credit-cart",component:CreditCartComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
