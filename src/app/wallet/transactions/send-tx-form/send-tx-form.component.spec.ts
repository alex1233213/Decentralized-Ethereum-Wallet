import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendTxFormComponent } from './send-tx-form.component';

describe('SendTxFormComponent', () => {
  let component: SendTxFormComponent;
  let fixture: ComponentFixture<SendTxFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendTxFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendTxFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
