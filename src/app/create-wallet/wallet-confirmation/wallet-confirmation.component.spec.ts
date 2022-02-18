import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletConfirmationComponent } from './wallet-confirmation.component';

describe('WalletConfirmationComponent', () => {
  let component: WalletConfirmationComponent;
  let fixture: ComponentFixture<WalletConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
