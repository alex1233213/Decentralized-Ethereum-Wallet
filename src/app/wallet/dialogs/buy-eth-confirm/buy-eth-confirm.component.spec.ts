import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyEthConfirmComponent } from './buy-eth-confirm.component';

describe('BuyEthConfirmComponent', () => {
  let component: BuyEthConfirmComponent;
  let fixture: ComponentFixture<BuyEthConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyEthConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyEthConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
