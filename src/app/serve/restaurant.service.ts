import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
interface restaurant{
  id:string,
  name:string,
  address:string,
  description:string,
  phone:string,
  image:string[],
}
@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  firebase_data!:AngularFireList<any>;
  firebase_img!:AngularFireList<any>;
 lisImage!:AngularFireList<any>

 task!: AngularFireUploadTask;
  constructor(private readonly _database:AngularFireDatabase,
    private readonly store:AngularFireStorage) {
    this.firebase_data=this._database.list('restaurant');

   }

  getlistrestaurant(){


  return  this.firebase_data.snapshotChanges(['child_added'])

  }
  getlistImage(id:string){
return this.lisImage=this._database.list(`restaurant/${id}/image`)
  }
  setrestaurant(restaurant:restaurant,array:string[]){
    this.firebase_data.set(restaurant.id,restaurant).then(()=>{
      return of(confirm('Thêm thành công'));
    });
    this.firebase_img=this._database.list(`restaurant/${restaurant.id}/image`)
    for (let index = 0; index < array.length; index++) {
      this.firebase_img.set(`image${index}`,array[index]);

    }
  }
  uploadImage(file:File[]):Observable<string[]>{
    const imagesURL:string[]=[]
    const path = `restaurant/`;
    file.forEach(element => {
    const ref = this.store.ref(path+element.name);
      this.task = this.store.upload(path+element.name,element);
     this.task.snapshotChanges().pipe(
        finalize( async() => {const url = ref.getDownloadURL().toPromise();
          imagesURL.push(await url);
        } )
     )
    .subscribe()

    });
    return of(imagesURL);


  }
  updaterestaurant(restaurant:restaurant,array:string[]){
    this.firebase_data.update(restaurant.id,restaurant);
    this.firebase_img=this._database.list(`restaurant/${restaurant.id}/image`);
    for (let index = 0; index < array.length; index++) {
      this.firebase_img.set(`image${index}`,array[index]);

    }
  }
  remorestaurant(id:string){
    this.firebase_data.remove(id);
  }


}
