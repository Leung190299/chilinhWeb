import { CommonModule } from "@angular/common";

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShopCreateComponent } from "./shop-create/shop-create.component";
import { ShopEditComponent } from "./shop-edit/shop-edit.component";
import { ShopsComponent } from "./shops/shops.component";

const route:Routes=[
  {path:'',component:ShopsComponent},
  {path:'create', component:ShopCreateComponent},
  {path:'edit/:id', component:ShopEditComponent}
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
export class shoplRouting{}
