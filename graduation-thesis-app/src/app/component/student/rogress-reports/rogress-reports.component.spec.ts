import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RogressReportsComponent } from './rogress-reports.component';

describe('RogressReportsComponent', () => {
  let component: RogressReportsComponent;
  let fixture: ComponentFixture<RogressReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RogressReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RogressReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
