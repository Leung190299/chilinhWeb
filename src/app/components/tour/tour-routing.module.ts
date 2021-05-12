import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TourCreateComponent } from "./tour-create/tour-create.component";
import { TourEditComponent } from "./tour-edit/tour-edit.component";
import { ToursComponent } from "./tours/tours.component";

const route:Routes=[
  {path:'',component:ToursComponent},
  {path:'create', component:TourCreateComponent},
  {path:'edit/:id', component:TourEditComponent}
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
export class tourRouting{}
