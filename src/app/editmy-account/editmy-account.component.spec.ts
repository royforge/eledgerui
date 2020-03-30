import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmyAccountComponent } from './editmy-account.component';

describe('EditmyAccountComponent', () => {
  let component: EditmyAccountComponent;
  let fixture: ComponentFixture<EditmyAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmyAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
