import { TestBed } from '@angular/core/testing';

import { CustomErrorHandlerService } from './custom-error-handler-service.service';

describe('CustomErrorHandlerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomErrorHandlerService = TestBed.get(CustomErrorHandlerService);
    expect(service).toBeTruthy();
  });
});
