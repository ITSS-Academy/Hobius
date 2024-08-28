import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbookInfoComponent } from './ebook-info.component';

describe('EbookInfoComponent', () => {
  let component: EbookInfoComponent;
  let fixture: ComponentFixture<EbookInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EbookInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EbookInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
