import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { RestaurantService } from 'src/app/serve/restaurant.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { element } from 'protractor';
interface Irestaurant{
  id:string,
  name:string,
  address:string,
  description:string,
  phone:string,
  img:string

}
@Component({
  selector: 'app-restaurant-create',
  templateUrl: './restaurant-create.component.html',
  styleUrls: ['./restaurant-create.component.css']
})
export class RestaurantCreateComponent implements OnInit {

  formGroup!:FormGroup;
  images:string[]= [];
  imagesURL:string[]=[];
  show=false;
  myForm!:FormGroup;
  file:File[]=[];
  task!: AngularFireUploadTask;


  constructor(private readonly restaurant:RestaurantService,
    private readonly fb:FormBuilder,
    private readonly store:AngularFireStorage
    ) { }

  ngOnInit(): void {
    this.formGroup=this.fb.group({
      id:new FormControl('',Validators.required),
      name:new FormControl('',Validators.required),
      address:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required),
      phone:new FormControl('',Validators.required),
      img:new FormControl('',Validators.required),
    })
    this.myForm=this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required])
    });
  }

  onFileChange(event:any) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          this.file.push(event.target.files[i])
          console.log(this.file)
                var reader = new FileReader();
                reader.onload = (event:any) => {
                  this.images.push(event.target.result)
                }
                reader.readAsDataURL(event.target.files[i]);
        }
    }

  }
  uploadImage(){

    const path = `restaurant/`;
    this.file.forEach(element => {
    const ref = this.store.ref(path+element.name);
      this.task = this.store.upload(path+element.name,element);
     this.task.snapshotChanges().pipe(
        finalize( async() => {const url = ref.getDownloadURL().toPromise();
          this.imagesURL.push(await url);
        } )
     )
    .subscribe()

    });
    alert('upload thành công!')
    this.show=false;

    console.log(this.imagesURL);
  }


them()
{
  this.restaurant.setrestaurant(this.formGroup.value,this.imagesURL);
  window.location.reload();
}

}
