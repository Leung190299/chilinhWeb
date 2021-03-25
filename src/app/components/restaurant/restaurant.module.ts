import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { restaurantRouting } from "./restaurant-routing.module";
import { RestaurantsComponent } from "./restaurants/restaurants.component";

@NgModule({
  declarations:[RestaurantsComponent],
  imports:[
    CommonModule,
    restaurantRouting
  ]
})
export class restaurantModule{}
