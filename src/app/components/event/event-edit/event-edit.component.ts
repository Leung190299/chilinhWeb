import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { EventService } from 'src/app/serve/event.service';
interface event{
  id:string,
  name:string,
  description:string,
  dateStart:string,
  dateEnd:string,
  image:string[],
}
@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
  event$!:event;
  formEit!:FormGroup;
  image:any[]=[];
  file:File[]=[];
  image2:any[]=[];
  constructor(
    private readonly route:ActivatedRoute,
    private readonly _event:EventService,
    private readonly form:FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(pluck('id')).subscribe(id=>{
      this._event.getDataEvent().subscribe(e=>{
        this.event$=e.find(item=>item.key===id)?.payload.val();
        this._event.getImage(id).snapshotChanges(['child_added']).subscribe(imgs=>{
          imgs.forEach(item=>{
            this.image.push(item.payload.val())
          })
        })
      })
    });
    this.formEit=this.form.group({
      id:new FormControl('',Validators.required),
      name:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required),
      dateStart:new FormControl('',Validators.required),
      dateEnd:new FormControl('',Validators.required),
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
    this._event.uploadImage(this.file).subscribe(a=>{
      this.image2=a;
     for (let index = 0; index < a.length; index++) {
       const element = a[index];
       console.log(element)
     }

    })
};

edit(){
  this._event.updateDataEvent(this.event$,this.image2);
  window.location.reload();
}
}
