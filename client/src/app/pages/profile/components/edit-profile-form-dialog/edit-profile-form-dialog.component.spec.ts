import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileFormDialogComponent } from './edit-profile-form-dialog.component';

describe('EditProfileFormDialogComponent', () => {
  let component: EditProfileFormDialogComponent;
  let fixture: ComponentFixture<EditProfileFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProfileFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfileFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
