import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/serve/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  event:any[]=[];
  id!:string;
  show:boolean=false
  constructor(
    private readonly _event:EventService
  ) { }

  ngOnInit(): void {
    this._event.getDataEvent().subscribe(item=>{
      item.forEach(e=>{
        this.event.push(e.payload.val())
      })
    })
  }
  dialogshow(id:string){
    this.id=id;
    this.show=!this.show;
  }
  delete_item(){
    this._event.DeleteDataEvent(this.id)
    window.location.reload();
  }


}
