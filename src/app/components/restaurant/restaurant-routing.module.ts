import { CommonModule } from "@angular/common";

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EditRestaurantComponent } from "./edit-restaurant/edit-restaurant.component";
import { RestaurantCreateComponent } from "./restaurant-create/restaurant-create.component";
import { RestaurantsComponent } from "./restaurants/restaurants.component";
const route:Routes=[
  {path:'',component:RestaurantsComponent},
  {path:'create', component:RestaurantCreateComponent},
  {path:'edit/:id', component:EditRestaurantComponent}
]
@NgModule({
  imports:[
    CommonModule,
    RouterModule.forChild(route)
  ],
  exports: [RouterModule]
})
export class restaurantRouting{}
