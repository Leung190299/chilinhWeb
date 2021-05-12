import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SightseeService } from 'src/app/serve/sightsee.service';

@Component({
  selector: 'app-sightsee-create',
  templateUrl: './sightsee-create.component.html',
  styleUrls: ['./sightsee-create.component.css']
})
export class SightseeCreateComponent implements OnInit {
  formGroup!:FormGroup;
  images:string[]= [];
  imagesURL:any[]=[];
  show=false;
  myForm!:FormGroup;
  file:File[]=[];
  constructor(
    private readonly fb:FormBuilder,
    private readonly sightsee:SightseeService
  ) { }

  ngOnInit(): void {
    this.formGroup=this.fb.group({
      id:new FormControl('',Validators.required),
      name:new FormControl('',Validators.required),
      address:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required),
      email:new FormControl('',Validators.required),

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
    this.sightsee.createDataSightsee(this.formGroup.value,this.imagesURL);
    window.location.reload();
  }
  uploadImage(){
    this.sightsee.uploadImage(this.file).subscribe(imgs=>{
      this.imagesURL=imgs;
      console.log(this.imagesURL)
    })
    this.show=!this.show;
  }

}
