import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MenuComponent } from "src/app/public/menu/menu.component";

import { restaurantRouting } from "./restaurant-routing.module";
import { RestaurantsComponent } from "./restaurants/restaurants.component";
import { RestaurantCreateComponent } from './restaurant-create/restaurant-create.component';

@NgModule({
  declarations:[
    RestaurantsComponent,
    MenuComponent,
    RestaurantCreateComponent,

  ],
  imports:[
    CommonModule,
    restaurantRouting,
    ReactiveFormsModule,
  ]
})
export class restaurantModule{}
