import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/serve/shop.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {
  shops:any[]=[];
  id!:string;
  show:boolean=false
  constructor(private readonly _shop:ShopService) { }

  ngOnInit(): void {
    this._shop.getDataShop().subscribe(shops=>{
      shops.forEach(item=>{
        this.shops.push(item.payload.val())
      })
    })
  }
  dialogshow(id:string){
    this.id=id;
    this.show=!this.show;
  }
  delete_item(){
    this._shop.DeleteDataShop(this.id)
  }

}
