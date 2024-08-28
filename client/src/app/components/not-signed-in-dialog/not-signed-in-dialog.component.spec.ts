import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotSignedInDialogComponent } from './not-signed-in-dialog.component';

describe('NotSignedInDialogComponent', () => {
  let component: NotSignedInDialogComponent;
  let fixture: ComponentFixture<NotSignedInDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotSignedInDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotSignedInDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
