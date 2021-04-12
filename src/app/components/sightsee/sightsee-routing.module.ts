import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SightseeCreateComponent } from "./sightsee-create/sightsee-create.component";
import { SightseeEditComponent } from "./sightsee-edit/sightsee-edit.component";
import { SightseesComponent } from "./sightsees/sightsees.component";


const route:Routes=[
  {path:'',component:SightseesComponent},
  {path:'create', component:SightseeCreateComponent},
  {path:'edit/:id', component:SightseeEditComponent}
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
export class sightseeRouting{}
