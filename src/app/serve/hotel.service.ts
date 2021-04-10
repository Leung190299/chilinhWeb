import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
interface hotel{
  id:string,
  name:string,
  address:string,
  phone:string,
  description:string,
  image:string[]
}
@Injectable({
  providedIn: 'root'
})
export class HotelService {
  FirebaseData!:AngularFireList<any>
  CreateDataImage!:AngularFireList<any>;
  GetDataImage!:AngularFireList<any>;
  task!: AngularFireUploadTask;
  constructor(
    private readonly _database:AngularFireDatabase,
    private readonly _store:AngularFireStorage,
  ) {
    this.FirebaseData=this._database.list('hotel');
  }
  getDataHotel(){
    return this.FirebaseData.snapshotChanges(['child_added']);
  }
  getImage(id:string){
   return this.GetDataImage=this._database.list(`hotel/${id}/image`)
  }
  createDataHotel(hotel:hotel,image:string[]){
    this.FirebaseData.set(hotel.id,hotel).then(()=>{
      this.CreateDataImage=this._database.list(`hotel/${hotel.id}/image`);
      for (let index = 0; index < image.length; index++) {
        this.CreateDataImage.set(`image${index}`,image[index])
      }
      confirm('thêm thành công')
    })
  }
  updateDataHotel(hotel:hotel,image:string[]){
    this.FirebaseData.update(hotel.id,hotel).then(()=>{
      this.CreateDataImage=this._database.list(`hotel/${hotel.id}/image`);
      for (let index = 0; index < image.length; index++) {
        this.CreateDataImage.set(`image${index}`,image[index])
      }
      confirm('Update Thành công!');
    })
  }
  uploadImage(file:File[]):Observable<string[]>{
    const imagesURL:string[]=[]
    const path = `hotle/`;
    file.forEach(element => {
    const ref = this._store.ref(path+element.name);
      this.task = this._store.upload(path+element.name,element);
     this.task.snapshotChanges().pipe(
        finalize( async() => {const url = ref.getDownloadURL().toPromise();
          imagesURL.push(await url);
        } )
     )
    .subscribe()
    });
    return of(imagesURL);
  }
  DeleteDataHotel(id:string){
    this.FirebaseData.remove(id)
  }
}
