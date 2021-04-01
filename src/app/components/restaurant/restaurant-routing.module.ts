import { CommonModule } from "@angular/common";

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RestaurantCreateComponent } from "./restaurant-create/restaurant-create.component";
import { RestaurantsComponent } from "./restaurants/restaurants.component";
const route:Routes=[
  {path:'',component:RestaurantsComponent},
  {path:'create', component:RestaurantCreateComponent}
]
@NgModule({
  imports:[
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class restaurantRouting{}
