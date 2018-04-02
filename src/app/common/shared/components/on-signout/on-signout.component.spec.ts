import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnSignoutComponent } from './on-signout.component';

describe('OnSignoutComponent', () => {
  let component: OnSignoutComponent;
  let fixture: ComponentFixture<OnSignoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnSignoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnSignoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
