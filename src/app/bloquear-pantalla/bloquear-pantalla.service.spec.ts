/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BloquearPantallaService } from './bloquear-pantalla.service';

describe('BloquearPantallaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BloquearPantallaService]
    });
  });

  it('should ...', inject([BloquearPantallaService], (service: BloquearPantallaService) => {
    expect(service).toBeTruthy();
  }));
});
