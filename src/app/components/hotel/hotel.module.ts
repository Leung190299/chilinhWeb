import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelsComponent } from './hotels/hotels.component';
import { HotelCreateComponent } from './hotel-create/hotel-create.component';
import { HotelEditComponent } from './hotel-edit/hotel-edit.component';
import { hotelRouting } from './hotel-routing.module';
import { Menu1Component } from '../../public/menu1/menu1.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HotelsComponent,
     HotelCreateComponent,
     HotelEditComponent,
     ],
  imports: [
    CommonModule,
    hotelRouting,
    ReactiveFormsModule
  ]
})
export class HotelModule { }
