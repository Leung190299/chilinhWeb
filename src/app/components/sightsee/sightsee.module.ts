import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SightseesComponent } from './sightsees/sightsees.component';
import { SightseeEditComponent } from './sightsee-edit/sightsee-edit.component';
import { SightseeCreateComponent } from './sightsee-create/sightsee-create.component';
import { sightseeRouting } from './sightsee-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SightseesComponent, SightseeEditComponent, SightseeCreateComponent],
  imports: [
    CommonModule,
    sightseeRouting,
    ReactiveFormsModule
  ]
})
export class SightseeModule { }
