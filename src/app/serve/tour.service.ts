import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
interface tour{
  id:string,
  ngay:number,
  diadanh:[],
  gia:0,
  lotrinh:string,
  phone:string
}
@Injectable({
  providedIn: 'root'
})
export class TourService {
  FirebaseData!:AngularFireList<any>
  constructor(
    private readonly _database:AngularFireDatabase,
  ) {
    this.FirebaseData=this._database.list('tour');
  }

  getDataSinghtsee(){
    return this.FirebaseData.snapshotChanges(['child_added']);
  }

  createDataTour(tour:tour){
    this.FirebaseData.set(tour.id,tour).then(()=>{
      confirm('thêm thành công')
    })
  }
  updateDataTour(tour:tour){
    this.FirebaseData.update(tour.id,tour).then(()=>{

      confirm('Update Thành công!');
    })
  }
  DeleteDataTour(id:string){
    this.FirebaseData.remove(id)
  }
}
