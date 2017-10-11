import { TestBed, inject } from '@angular/core/testing';

import { CambiarEntornoService } from './cambiar-entorno.service';

describe('CambiarEntornoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CambiarEntornoService]
    });
  });

  it('should ...', inject([CambiarEntornoService], (service: CambiarEntornoService) => {
    expect(service).toBeTruthy();
  }));
});
