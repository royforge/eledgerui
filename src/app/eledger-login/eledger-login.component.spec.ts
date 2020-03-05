import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EledgerLoginComponent } from './eledger-login.component';

describe('EledgerLoginComponent', () => {
  let component: EledgerLoginComponent;
  let fixture: ComponentFixture<EledgerLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EledgerLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EledgerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
