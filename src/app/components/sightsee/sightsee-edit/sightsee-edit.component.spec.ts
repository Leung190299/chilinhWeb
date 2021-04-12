import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SightseeEditComponent } from './sightsee-edit.component';

describe('SightseeEditComponent', () => {
  let component: SightseeEditComponent;
  let fixture: ComponentFixture<SightseeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SightseeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SightseeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
