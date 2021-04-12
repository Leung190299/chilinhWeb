import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SightseesComponent } from './sightsees.component';

describe('SightseesComponent', () => {
  let component: SightseesComponent;
  let fixture: ComponentFixture<SightseesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SightseesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SightseesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
