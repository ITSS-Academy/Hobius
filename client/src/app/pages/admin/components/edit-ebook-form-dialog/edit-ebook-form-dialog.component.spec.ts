import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEbookFormDialogComponent } from './edit-ebook-form-dialog.component';

describe('EditEbookFormDialogComponent', () => {
  let component: EditEbookFormDialogComponent;
  let fixture: ComponentFixture<EditEbookFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEbookFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEbookFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
