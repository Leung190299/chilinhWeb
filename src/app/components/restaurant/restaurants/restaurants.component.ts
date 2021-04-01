import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';


import { RestaurantService } from 'src/app/serve/restaurant.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit,OnChanges {
  restaurants:any[]=[];
  xoa:boolean=false;

  id:string="";
  constructor(private readonly restaurant:RestaurantService) { }

  ngOnInit(): void {
    this.restaurant.getlistrestaurant().subscribe(actions => {
      actions.forEach(action => {
        console.log(action.payload.val());
        this.restaurants.push(action.payload.val());
      });
    })
  }
ngOnChanges(){

}
  delete_item(){

  this.restaurant.remorestaurant(this.id);
  this.xoa=!this.xoa;
  window.location.reload();
  }
  dialogshow(id:string){
    this.xoa=!this.xoa;
    this.id=id;

  }
}
