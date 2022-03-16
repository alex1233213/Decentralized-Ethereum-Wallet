import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTxDialogComponent } from './confirm-tx-dialog.component';

describe('ConfirmTxDialogComponent', () => {
  let component: ConfirmTxDialogComponent;
  let fixture: ComponentFixture<ConfirmTxDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmTxDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmTxDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
