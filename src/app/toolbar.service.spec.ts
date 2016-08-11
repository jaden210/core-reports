/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { ToolbarService } from './toolbar.service';

describe('Toolbar Service', () => {
  beforeEachProviders(() => [ToolbarService]);

  it('should ...',
      inject([ToolbarService], (service: ToolbarService) => {
    expect(service).toBeTruthy();
  }));
});
