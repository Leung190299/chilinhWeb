import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guard/login.guard';


const routes: Routes = [
  {
  path:'login' ,
  component:LoginComponent
},
{path:'', redirectTo:'/restaurant',pathMatch:'full'},
{path:'restaurant', loadChildren:()=>import('./components/restaurant/restaurant.module').then(m=>m.restaurantModule),
canActivate:[LoginGuard]},
{path:'hotel',loadChildren:()=>import('./components/hotel/hotel.module').then(h=>h.HotelModule),canActivate:[LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
