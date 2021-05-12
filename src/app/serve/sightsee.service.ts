import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
interface sightsee{
  id:string,
  name:string,
  address:string,
  description:string,

  image:string[],
}
@Injectable({
  providedIn: 'root'
})
export class SightseeService {
  FirebaseData!:AngularFireList<any>
  CreateDataImage!:AngularFireList<any>;
  GetDataImage!:AngularFireList<any>;
  task!: AngularFireUploadTask;
  constructor(
    private readonly _database:AngularFireDatabase,
    private readonly _store:AngularFireStorage,
  ) {
    this.FirebaseData=this._database.list('sightsee');
   }

   getDataSinghtsee(){
    return this.FirebaseData.snapshotChanges(['child_added']);
  }
  getImage(id:string){
   return this.GetDataImage=this._database.list(`sightsee/${id}/image`)
  }
  createDataSightsee(sightsee:sightsee,image:string[]){
    this.FirebaseData.set(sightsee.id,sightsee).then(()=>{
      this.CreateDataImage=this._database.list(`sightsee/${sightsee.id}/image`);
      console.log(image)
      for (let index = 0; index < image.length; index++) {
        this.CreateDataImage.set(`image${index}`,image[index])
      }
      confirm('thêm thành công')
    })
  }
  updateDataSightsee(sightsee:sightsee,image:string[]){
    this.FirebaseData.update(sightsee.id,sightsee).then(()=>{
      this.CreateDataImage=this._database.list(`sightsee/${sightsee.id}/image`);
      for (let index = 0; index < image.length; index++) {
        this.CreateDataImage.set(`image${index}`,image[index])
      }
      confirm('Update Thành công!');
    })
  }
  uploadImage(file:File[]):Observable<string[]>{
    const imagesURL:string[]=[]
    const path = `sightsee/`;
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
    confirm('Upload thành công!');
    return of(imagesURL);
  }
  DeleteDataSightsee(id:string){
    this.FirebaseData.remove(id)
  }
}
