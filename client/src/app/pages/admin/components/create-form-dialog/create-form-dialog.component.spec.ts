import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFormDialogComponent } from './create-form-dialog.component';

describe('CreateFormDialogComponent', () => {
  let component: CreateFormDialogComponent;
  let fixture: ComponentFixture<CreateFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
