import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToursComponent } from './tours/tours.component';
import { TourCreateComponent } from './tour-create/tour-create.component';
import { TourEditComponent } from './tour-edit/tour-edit.component';
import { tourRouting } from './tour-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ToursComponent,
    TourCreateComponent,
    TourEditComponent,
  ],
  imports: [
    CommonModule,
    tourRouting,
    ReactiveFormsModule
  ]
})
export class TourModule { }
