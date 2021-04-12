import { Component, OnInit } from '@angular/core';
import { SightseeService } from 'src/app/serve/sightsee.service';

@Component({
  selector: 'app-sightsees',
  templateUrl: './sightsees.component.html',
  styleUrls: ['./sightsees.component.css']
})
export class SightseesComponent implements OnInit {
  Sightseet:any[]=[];
  id!:string;
  show:boolean=false
  constructor(
    private readonly _sightsee:SightseeService
  ) { }

  ngOnInit(): void {
    this._sightsee.getDataSinghtsee().subscribe(sightsees=>{
      sightsees.forEach(item=>{this.Sightseet.push(item.payload.val())}
      )
    })
  }
  dialogshow(id:string){
    this.id=id;
    this.show=!this.show;
  }
  delete_item(){
    this._sightsee.DeleteDataSightsee(this.id)
    window.location.reload();
  }

}
