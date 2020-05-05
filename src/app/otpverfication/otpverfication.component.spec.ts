import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpverficationComponent } from './otpverfication.component';

describe('OtpverficationComponent', () => {
  let component: OtpverficationComponent;
  let fixture: ComponentFixture<OtpverficationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpverficationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpverficationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
