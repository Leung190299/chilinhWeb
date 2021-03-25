import { CommonModule } from "@angular/common";

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RestaurantsComponent } from "./restaurants/restaurants.component";
const route:Routes=[
  {path:'',component:RestaurantsComponent}
]
@NgModule({
  imports:[
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class restaurantRouting{}
