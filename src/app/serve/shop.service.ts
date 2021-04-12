import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
interface shop{
  id:string,
  name:string,
  address:string,
  phone:string,
  description:string,
  email:string,
  image:string[]
}
@Injectable({
  providedIn: 'root'
})
export class ShopService {
  FirebaseData!:AngularFireList<any>
  CreateDataImage!:AngularFireList<any>;
  GetDataImage!:AngularFireList<any>;
  task!: AngularFireUploadTask;
  constructor(
    private readonly _database:AngularFireDatabase,
    private readonly _store:AngularFireStorage,
  ) {
    this.FirebaseData=this._database.list('shop');
   }

   getDataShop(){
    return this.FirebaseData.snapshotChanges(['child_added']);
  }
  getImage(id:string){
   return this.GetDataImage=this._database.list(`shop/${id}/image`)
  }
  createDataShop(shop:shop,image:string[]){
    this.FirebaseData.set(shop.id,shop).then(()=>{
      this.CreateDataImage=this._database.list(`shop/${shop.id}/image`);
      for (let index = 0; index < image.length; index++) {
        this.CreateDataImage.set(`image${index}`,image[index])
      }
      confirm('thêm thành công')
    })
  }
  updateDataShop(shop:shop,image:string[]){
    this.FirebaseData.update(shop.id,shop).then(()=>{
      this.CreateDataImage=this._database.list(`shop/${shop.id}/image`);
      for (let index = 0; index < image.length; index++) {
        this.CreateDataImage.set(`image${index}`,image[index])
      }
      confirm('Update Thành công!');
    })
  }
  uploadImage(file:File[]):Observable<string[]>{
    const imagesURL:string[]=[]
    const path = `shop/`;
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
  DeleteDataShop(id:string){
    this.FirebaseData.remove(id)
  }
}
