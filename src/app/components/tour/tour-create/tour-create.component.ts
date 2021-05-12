import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TourService } from 'src/app/serve/tour.service';

@Component({
  selector: 'app-tour-create',
  templateUrl: './tour-create.component.html',
  styleUrls: ['./tour-create.component.css']
})
export class TourCreateComponent implements OnInit {
  formGroup!:FormGroup;
  constructor(
    private readonly _Tour:TourService,
    private readonly fb:FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formGroup=this.fb.group({
      id:new FormControl('',Validators.required),
      ngay:new FormControl('',Validators.required),

      gia:new FormControl('',Validators.required),
      lotrinh:new FormControl('',Validators.required),
      phone:new FormControl('',Validators.required),

    })
  }
  them()
  {
    this._Tour.createDataTour(this.formGroup.value);
    window.location.reload();
  }
}
