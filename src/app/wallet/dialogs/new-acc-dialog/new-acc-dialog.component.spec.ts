import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAccDialogComponent } from './new-acc-dialog.component';

describe('NewAccDialogComponent', () => {
  let component: NewAccDialogComponent;
  let fixture: ComponentFixture<NewAccDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAccDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAccDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
