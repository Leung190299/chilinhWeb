import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { ShopService } from 'src/app/serve/shop.service';
interface shop{
  id:string,
  name:string,
  address:string,
  phone:string,
  description:string,
  email:string,
  image:string[]
}
@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrls: ['./shop-edit.component.css']
})
export class ShopEditComponent implements OnInit {
  shop$!:shop;
  formEit!:FormGroup;
  image:any[]=[];
  file:File[]=[];
  image2:any[]=[];
  constructor(
    private readonly _shop:ShopService,
    private readonly route:ActivatedRoute,
    private readonly form:FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(pluck('id')).subscribe(id=>{
      this._shop.getDataShop().subscribe(res=>{
        this.shop$=res.find(item=>item.key===id)?.payload.val();
        this._shop.getImage(id).snapshotChanges(['child_added']).subscribe(res=>{
          res.forEach(item=>{
            this.image.push(item.payload.val())
          })
        })
      })
    })


    this.formEit=this.form.group({
      id:new FormControl('',Validators.required),
      name:new FormControl('',Validators.required),
      address:new FormControl('',Validators.required),
      phone:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required),
      email:new FormControl('',Validators.required),
    })
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
    this._shop.uploadImage(this.file).subscribe(a=>{
      this.image2=a;
     for (let index = 0; index < a.length; index++) {
       const element = a[index];
       console.log(element)
     }

    })
};
edit(){
  this._shop.updateDataShop(this.shop$,this.image2);
  window.location.reload();
}

}
