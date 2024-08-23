import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInputCommentDialogComponent } from './add-input-comment-dialog.component';

describe('AddInputCommentDialogComponent', () => {
  let component: AddInputCommentDialogComponent;
  let fixture: ComponentFixture<AddInputCommentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInputCommentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInputCommentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
