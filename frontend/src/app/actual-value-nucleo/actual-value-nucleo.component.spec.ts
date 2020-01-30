import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualValueNucleoComponent } from './actual-value-nucleo.component';

describe('ActualValueNucleoComponent', () => {
  let component: ActualValueNucleoComponent;
  let fixture: ComponentFixture<ActualValueNucleoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualValueNucleoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualValueNucleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
