import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEbookFormDialogComponent } from './add-ebook-form-dialog.component';

describe('AddEbookFormDialogComponent', () => {
  let component: AddEbookFormDialogComponent;
  let fixture: ComponentFixture<AddEbookFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEbookFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEbookFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
