import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";


import { restaurantRouting } from "./restaurant-routing.module";
import { RestaurantsComponent } from "./restaurants/restaurants.component";
import { RestaurantCreateComponent } from './restaurant-create/restaurant-create.component';

import { Menu1Component } from "../../public/menu1/menu1.component";

import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';

@NgModule({
  declarations:[
    RestaurantsComponent,
    RestaurantCreateComponent,

    EditRestaurantComponent,

  ],
  imports:[
    CommonModule,
    restaurantRouting,
    ReactiveFormsModule,

  ]
})
export class restaurantModule{}
