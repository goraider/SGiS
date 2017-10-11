/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JwtRequestService } from './jwt-request.service';

describe('JwtRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtRequestService]
    });
  });

  it('should ...', inject([JwtRequestService], (service: JwtRequestService) => {
    expect(service).toBeTruthy();
  }));
});
