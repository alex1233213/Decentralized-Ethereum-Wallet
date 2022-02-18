import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMnemonicComponent } from './display-mnemonic.component';

describe('DisplayMnemonicComponent', () => {
  let component: DisplayMnemonicComponent;
  let fixture: ComponentFixture<DisplayMnemonicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayMnemonicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMnemonicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
