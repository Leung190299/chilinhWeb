import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
  path:'' ,
  component:LoginComponent
},
{path:'restaurant', loadChildren:()=>import('./components/restaurant/restaurant.module').then(m=>m.restaurantModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
