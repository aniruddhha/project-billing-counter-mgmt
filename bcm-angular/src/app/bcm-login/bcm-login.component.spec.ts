import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BcmLoginComponent } from './bcm-login.component';

describe('BcmLoginComponent', () => {
  let component: BcmLoginComponent;
  let fixture: ComponentFixture<BcmLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BcmLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BcmLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
