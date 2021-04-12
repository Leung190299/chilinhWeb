import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EventCreateComponent } from "./event-create/event-create.component";
import { EventEditComponent } from "./event-edit/event-edit.component";
import { EventsComponent } from "./events/events.component";

const route:Routes=[
  {path:'',component:EventsComponent},
  {path:'create', component:EventCreateComponent},
  {path:'edit/:id', component:EventEditComponent}
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
export class eventRouting{}
