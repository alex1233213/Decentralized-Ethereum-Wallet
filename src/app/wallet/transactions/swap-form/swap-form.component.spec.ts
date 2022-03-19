import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapFormComponent } from './swap-form.component';

describe('SwapFormComponent', () => {
  let component: SwapFormComponent;
  let fixture: ComponentFixture<SwapFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwapFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
