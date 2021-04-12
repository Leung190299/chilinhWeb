import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SightseeCreateComponent } from './sightsee-create.component';

describe('SightseeCreateComponent', () => {
  let component: SightseeCreateComponent;
  let fixture: ComponentFixture<SightseeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SightseeCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SightseeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
