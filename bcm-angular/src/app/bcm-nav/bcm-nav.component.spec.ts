import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BcmNavComponent } from './bcm-nav.component';

describe('BcmNavComponent', () => {
  let component: BcmNavComponent;
  let fixture: ComponentFixture<BcmNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BcmNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BcmNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
