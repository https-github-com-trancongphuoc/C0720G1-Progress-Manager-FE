import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentPostReplyCreateComponent } from './comment-post-reply-create.component';

describe('CommentPostReplyCreateComponent', () => {
  let component: CommentPostReplyCreateComponent;
  let fixture: ComponentFixture<CommentPostReplyCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentPostReplyCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentPostReplyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
