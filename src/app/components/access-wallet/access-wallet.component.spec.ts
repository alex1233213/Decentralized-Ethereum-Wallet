import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessWalletComponent } from './access-wallet.component';

describe('AccessWalletComponent', () => {
  let component: AccessWalletComponent;
  let fixture: ComponentFixture<AccessWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
