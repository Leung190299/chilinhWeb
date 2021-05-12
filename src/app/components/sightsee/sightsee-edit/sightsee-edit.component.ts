import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { SightseeService } from 'src/app/serve/sightsee.service';
interface sightsee{
  id:string,
  name:string,
  address:string,
  description:string,
  email:string,
  image:string[],
}
@Component({
  selector: 'app-sightsee-edit',
  templateUrl: './sightsee-edit.component.html',
  styleUrls: ['./sightsee-edit.component.css']
})
export class SightseeEditComponent implements OnInit {
 sightsee$!:sightsee;
  formEit!:FormGroup;
  image:any[]=[];
  file:File[]=[];
  image2:any[]=[];
  constructor(
    private readonly route:ActivatedRoute,
    private readonly _sight:SightseeService,
    private readonly form:FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(pluck('id')).subscribe(id=>{
      this._sight.getDataSinghtsee().subscribe(e=>{
        this.sightsee$=e.find(item=>item.key===id)?.payload.val();
        this._sight.getImage(id).snapshotChanges(['child_added']).subscribe(imgs=>{
          imgs.forEach(item=>{
            this.image.push(item.payload.val())
          })
        })
      })
    });
    this.formEit=this.form.group({
      id:new FormControl('',Validators.required),
      name:new FormControl('',Validators.required),
      address:new FormControl('',Validators.required),
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
    this._sight.uploadImage(this.file).subscribe(a=>{
      this.image2=a;
    })
};
edit(){
  this._sight.updateDataSightsee(this.sightsee$,this.image2);
  window.location.reload();
}
}
