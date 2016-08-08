/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { ErrorEmailService } from './error-email.service';

describe('ErrorEmail Service', () => {
  beforeEachProviders(() => [ErrorEmailService]);

  it('should ...',
      inject([ErrorEmailService], (service: ErrorEmailService) => {
    expect(service).toBeTruthy();
  }));
});
