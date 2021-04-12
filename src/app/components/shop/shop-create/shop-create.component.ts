import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ShopService } from 'src/app/serve/shop.service';

@Component({
  selector: 'app-shop-create',
  templateUrl: './shop-create.component.html',
  styleUrls: ['./shop-create.component.css']
})
export class ShopCreateComponent implements OnInit {
  formGroup!:FormGroup;
  images:string[]= [];
  imagesURL:any[]=[];
  show=false;
  myForm!:FormGroup;
  file:File[]=[];
  constructor(
    private readonly _shop:ShopService,
    private readonly fb:FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formGroup=this.fb.group({
      id:new FormControl('',Validators.required),
      name:new FormControl('',Validators.required),
      address:new FormControl('',Validators.required),
      email:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required),
      phone:new FormControl('',Validators.required),

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
  them()
{
  this._shop.createDataShop(this.formGroup.value,this.imagesURL);
  console.log(this.imagesURL);
  window.location.reload();
}
uploadImage(){
  this._shop.uploadImage(this.file).subscribe(imgs=>{

    this.imagesURL=imgs;
    console.log(this.imagesURL)


  })
}
}
