import { TestBed } from '@angular/core/testing';

import { CustomErrorHandlerServiceService } from './custom-error-handler-service.service';

describe('CustomErrorHandlerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomErrorHandlerServiceService = TestBed.get(CustomErrorHandlerServiceService);
    expect(service).toBeTruthy();
  });
});
