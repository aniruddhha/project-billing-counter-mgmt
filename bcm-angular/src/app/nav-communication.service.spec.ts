import { TestBed } from '@angular/core/testing';

import { NavCommunicationService } from './nav-communication.service';

describe('NavCommunicationService', () => {
  let service: NavCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
