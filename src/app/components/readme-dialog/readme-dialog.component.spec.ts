import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadmeDialogComponent } from './readme-dialog.component';

describe('ReadmeDialogComponent', () => {
  let component: ReadmeDialogComponent;
  let fixture: ComponentFixture<ReadmeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadmeDialogComponent]
    });
    fixture = TestBed.createComponent(ReadmeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
