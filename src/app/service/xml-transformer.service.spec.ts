import { TestBed } from '@angular/core/testing';

import { XmlTransformerService } from './xml-transformer.service';

describe('XmlTransformerService', () => {
  let service: XmlTransformerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmlTransformerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
