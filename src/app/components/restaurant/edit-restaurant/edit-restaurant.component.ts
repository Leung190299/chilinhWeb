import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, find, map, pluck, switchMap, toArray } from 'rxjs/operators';
import { RestaurantService } from 'src/app/serve/restaurant.service';
interface restaurant{
  id:string,
  name:string,
  address:string,
  description:string,
  phone:string,
  image:string[],
}
@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit {
  restaurant$!:restaurant;
  formEit!:FormGroup;
  image:any[]=[];
  file:File[]=[];
  image2:any[]=[];
  constructor(private readonly route:ActivatedRoute,
    private readonly restaurants:RestaurantService,
    private readonly form:FormBuilder) { }

  ngOnInit(): void {
    this.route.params.pipe(pluck('id')).subscribe(id=>{
      this.restaurants.getlistrestaurant().subscribe(res=>{
        this.restaurant$=res.find(x=>x.key===id)?.payload.val();
        this.restaurants.getlistImage(id).snapshotChanges(['child_added']).subscribe(images=>{
          images.forEach(item=>{
           this.image.push(item.payload.val())

          })
        })
      });
    })

    this.formEit=this.form.group({
      id:new FormControl('',Validators.required),
      name:new FormControl('',Validators.required),
      address:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required),
      phone:new FormControl('',Validators.required),

    })

  }
  edit(){
    this.restaurants.updaterestaurant(this.restaurant$,this.image2);
    alert(' thành công')

    window.location.reload();
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

    this.restaurants.uploadImage(this.file).subscribe(a=>{
      this.image2=a;
     for (let index = 0; index < a.length; index++) {
       const element = a[index];
       console.log(element)
     }

    })

  }
}
