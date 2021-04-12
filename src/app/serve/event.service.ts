import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';
interface event{
  id:string,
  name:string,
  description:string,
  dateStart:string,
  dateEnd:string,
  image:string[],
}
@Injectable({
  providedIn: 'root'
})
export class EventService {
  FirebaseData!:AngularFireList<any>
  CreateDataImage!:AngularFireList<any>;
  GetDataImage!:AngularFireList<any>;
  task!: AngularFireUploadTask;
  constructor(private readonly _database:AngularFireDatabase,
    private readonly _store:AngularFireStorage,) {
      this.FirebaseData=this._database.list('event');
    }

    getDataEvent(){
      return this.FirebaseData.snapshotChanges(['child_added']);
    }
    getImage(id:string){
     return this.GetDataImage=this._database.list(`event/${id}/image`)
    }
    createDataEvent(event:event,image:string[]){
      this.FirebaseData.set(event.id,event).then(()=>{
        this.CreateDataImage=this._database.list(`event/${event.id}/image`);
        for (let index = 0; index < image.length; index++) {
          this.CreateDataImage.set(`image${index}`,image[index])
        }
        confirm('thêm thành công')
      })
    }
    updateDataEvent(event:event,image:string[]){
      this.FirebaseData.update(event.id,event).then(()=>{
        this.CreateDataImage=this._database.list(`event/${event.id}/image`);
        for (let index = 0; index < image.length; index++) {
          this.CreateDataImage.set(`image${index}`,image[index])
        }
        confirm('Update Thành công!');
      })
    }
    uploadImage(file:File[]):Observable<string[]>{
      const imagesURL:string[]=[]
      const path = `event/`;
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
    DeleteDataEvent(id:string){
      this.FirebaseData.remove(id)
    }
}
