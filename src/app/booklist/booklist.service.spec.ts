/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { BooklistService } from './booklist.service';

describe('Booklist Service', () => {
  beforeEachProviders(() => [BooklistService]);

  it('should ...',
      inject([BooklistService], (service: BooklistService) => {
    expect(service).toBeTruthy();
  }));
});
