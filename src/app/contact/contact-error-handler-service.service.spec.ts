import { TestBed } from '@angular/core/testing';

import { ContactErrorHandlerServiceService } from './contact-error-handler-service.service';

describe('ContactErrorHandlerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactErrorHandlerServiceService = TestBed.get(ContactErrorHandlerServiceService);
    expect(service).toBeTruthy();
  });
});
