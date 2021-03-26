import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { NaviComponent } from './components/navi/navi.component';
import { ColorComponent } from './components/color/color.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { FilterPipeBrandPipe } from './pipes/filter-pipe-brand.pipe';
import { FilterPipeColorPipe } from './pipes/filter-pipe-color.pipe';
import { FilterComponent } from './components/filter/filter.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarAddComponent } from './components/add-components/car-add/car-add.component';
import { BrandAddComponent } from './components/add-components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/add-components/color-add/color-add.component';
import { BrandUpdateComponent } from './components/update-components/brand-update/brand-update.component';

import { ToastrModule } from 'ngx-toastr';
import { CarUpdateComponent } from './components/update-components/car-update/car-update.component';
import { ColorUpdateComponent } from './components/update-components/color-update/color-update.component';




@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    NaviComponent,
    ColorComponent,
    CarComponent,
    RentalComponent,
    CarDetailComponent,
    FilterPipePipe,
    FilterPipeBrandPipe,
    FilterPipeColorPipe,
    FilterComponent,
    PaymentComponent,
    CustomerComponent,
    CarAddComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarUpdateComponent,
    BrandUpdateComponent,
    ColorUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass : "toast-bottom-right"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
