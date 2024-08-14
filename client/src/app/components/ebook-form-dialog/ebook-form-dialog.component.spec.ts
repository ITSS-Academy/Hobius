import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbookFormDialogComponent } from './ebook-form-dialog.component';

describe('EbookFormDialogComponent', () => {
  let component: EbookFormDialogComponent;
  let fixture: ComponentFixture<EbookFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EbookFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EbookFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
