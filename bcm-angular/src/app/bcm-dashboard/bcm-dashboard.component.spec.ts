import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BcmDashboardComponent } from './bcm-dashboard.component';

describe('BcmDashboardComponent', () => {
  let component: BcmDashboardComponent;
  let fixture: ComponentFixture<BcmDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BcmDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BcmDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
