import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { HotelService } from 'src/app/serve/hotel.service';
interface hotel{
id:string,
  name:string,
  address:string,
  phone:string,
  description:string,
  image:string[]

}
@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit {
  hotel$!:hotel;
  formEit!:FormGroup;
  image:any[]=[];
  file:File[]=[];
  image2:any[]=[];
  constructor(
    private readonly route:ActivatedRoute,
    private readonly _hotel:HotelService,
    private readonly form:FormBuilder

  ) { }

  ngOnInit(): void {
    this.route.params.pipe(pluck('id')).subscribe(id=>{
      this._hotel.getDataHotel().subscribe(h=>{
        this.hotel$=h.find(item=>item.key===id)?.payload.val();
        this._hotel.getImage(id).snapshotChanges(['child_added']).subscribe(imgs=>{
          imgs.forEach(item=>{
            this.image.push(item.payload.val())
          })
        })
      })
    })
    this.formEit=this.form.group({
      id:new FormControl('',Validators.required),
      name:new FormControl('',Validators.required),
      address:new FormControl('',Validators.required),
      discription:new FormControl('',Validators.required),
      phone:new FormControl('',Validators.required),

    })
    console.log(this.image)
  }
  OnFileChange(event:any){
    if(event.target.files && event.target.files[0]){
      var count=event.target.files.length;
      this.image=[];
      for (let index = 0; index < count; index++) {
        this.file.push(event.target.files[index])
        var reader = new FileReader();
        reader.onload = (event:any) => {
          this.image.push(event.target.result)
        }
        reader.readAsDataURL(event.target.files[index]);
      }
    }
    this._hotel.uploadImage(this.file).subscribe(a=>{
      this.image2=a;
     for (let index = 0; index < a.length; index++) {
       const element = a[index];
       console.log(element)
     }

    })
};
edit(){
  this._hotel.updateDataHotel(this.hotel$,this.image2);
  window.location.reload();
}
}
