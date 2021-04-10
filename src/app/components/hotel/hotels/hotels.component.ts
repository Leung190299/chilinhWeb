import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/serve/hotel.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  hotel:any[]=[];
  id!:string;
  show:boolean=false
  constructor(
    private readonly _hotel:HotelService
  ) { }

  ngOnInit(): void {
    this._hotel.getDataHotel().subscribe(hotels=>{
      hotels.forEach(item=>{
        this.hotel.push(item.payload.val())
      })
    })
  }
  dialogshow(id:string){
    this.id=id;
    this.show=!this.show;
  }
  delete_item(){
    this._hotel.DeleteDataHotel(this.id)
  }

}
