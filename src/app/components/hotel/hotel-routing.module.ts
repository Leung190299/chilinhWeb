import { CommonModule } from "@angular/common";

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HotelCreateComponent } from "./hotel-create/hotel-create.component";
import { HotelEditComponent } from "./hotel-edit/hotel-edit.component";
import { HotelsComponent } from "./hotels/hotels.component";
const route:Routes=[
  {path:'',component:HotelsComponent},
  {path:'create', component:HotelCreateComponent},
  {path:'edit/:id', component:HotelEditComponent}
]
@NgModule({
  imports:[
    CommonModule,
    RouterModule.forChild(route)
  ],
  exports:[
    RouterModule
  ]
})
export class hotelRouting{}
