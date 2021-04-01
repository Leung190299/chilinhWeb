import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
interface restaurant{
  id:string,
  name:string,
  address:string,
  description:string,
  phone:string,
  img:string

}
@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  firebase_data!:AngularFireList<any>;
  firebase_img!:AngularFireList<any>;
  list_restaurant!:Observable<any[]>;

  constructor(private readonly _database:AngularFireDatabase) {
    this.firebase_data=this._database.list('restaurant');

   }

  getlistrestaurant(){


  return  this.firebase_data.snapshotChanges(['child_added'])

  }
  setrestaurant(restaurant:restaurant,array:string[]){
    this.firebase_data.set(restaurant.id,restaurant);
    this.firebase_img=this._database.list(`restaurant/${restaurant.id}/image`)
    for (let index = 0; index < array.length; index++) {
      this.firebase_img.set(`image${index}`,array[index]);

    }
  }
  updaterestaurant(restaurant:restaurant){
    this.firebase_data.update(restaurant.id,restaurant);
  }
  remorestaurant(id:string){
    this.firebase_data.remove(id);
  }
}
