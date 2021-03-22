import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentPostReplyEditComponent } from './comment-post-reply-edit.component';

describe('CommentPostReplyEditComponent', () => {
  let component: CommentPostReplyEditComponent;
  let fixture: ComponentFixture<CommentPostReplyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentPostReplyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentPostReplyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
