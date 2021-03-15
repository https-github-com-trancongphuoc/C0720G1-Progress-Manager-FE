import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeTopicComponent } from './subscribe-topic.component';

describe('SubscribeTopicComponent', () => {
  let component: SubscribeTopicComponent;
  let fixture: ComponentFixture<SubscribeTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribeTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
